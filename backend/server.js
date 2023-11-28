const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
var server = require('http').Server(app);
const fs = require('fs');
const xlsx = require('xlsx');
var path = require('path');

//might need to change later
//currently allows anyone to call endpoints
const cors = require('cors');
app.use(cors());

app.use(express.json());

//MongoDB connection
const mongoose = require('mongoose');
// const fs = require('fs');
// const ZipModel = require('./Models/zipModel');
const mongoUri = 'mongodb+srv://jyoungbar02:VvUQMIUhjrqViALD@solar-incentives.08p60z2.mongodb.net/Incentives-Data?retryWrites=true&w=majority'; 
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
const schema = new mongoose.Schema({index: {type: Number, unique: true}, name: String, state: {type: String, required: true}, zipcodes: [Number], description: String /*put incentive data here*/});
const Adder = mongoose.model('adders', schema);
const EC = mongoose.model('energy-communities', schema);
const TC = mongoose.model('tribal-communities', schema);
// const timeSchema = new mongoose.Schema({/*_id: {type: ObjectID, required: true}, index: {type: Int32, required: true},*/ milliseconds: {type: Number/*INT32*/, required: true}, year: {type: Number/*INT32*/, required: true}, month: {type: Number/*INT32*/, required: true}, day: {type: Number/*INT32*/, required: true}});
// const LastUpdated = /*mongoose*/connection.model('Last-Updated', timeSchema);
const adderData = require('./Data/test.json');
// console.log(testData);

const root = path.join(__dirname, '..', 'team6', 'build');
app.use(express.static(root));

function removeTags(str) {
  if ((str===null) || (str===''))
    return false;
  else {
    str = str.toString();
  }
  return str.replace( /(<([^>]+)>)/ig, '');
}

app.post('/import-json', async (req, res) => {
  try {
    //compile zipcodes by state
    zipcodesMap = new Map();
    //here

    //read in data for Adders
    for(var i = 0; i < adderData.data.length; i++) {
      if(adderData.data[i].State == "New York" || adderData.data[i].State == "Colorado" || adderData.data[i].State == "California" || adderData.data[i].State == "Florida" || adderData.data[i].State == "Illinois") {
        // const newAdder = await new Adder({index: i, name: removeTags(adderData.data[i].Name), state: removeTags(adderData.data[i].State), zipcodes: removeTags(zipcodesMap[adderData.data[i].State]), description: removeTags(adderData.data[i].Summary}));
        // await newAdder.save();
        console.log(i, removeTags(adderData.data[i].Name), removeTags(adderData.data[i].State), removeTags(adderData.data[i].Summary));
      }
    }

    //energy communities
    // zipToCountyMap = new Map();
    const file = xlsx.readFile('./Data/zip_code_database.xls');
    let data = [];
    const sheets = file.SheetNames;
    for(let i = 0; i < sheets.length; i++) { 
      const temp = xlsx.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
      // temp.forEach((res) => {
      //   // console.log(res)
      // });
    }
    countyClosureMap = new Set();
    let directory_name = './Data/';
    let coal_closure_excelFileName = 'Coal_Closure_Energy_Communities_2023v2.csv';
    const coal_closure_filePath = path.resolve(directory_name, coal_closure_excelFileName);

    zipToCountyMap = new Map();
    let zipcode_closure_excelFileName = 'zip_code_database.xls';
    const zipcode_closure_filePath = path.resolve(directory_name, zipcode_closure_excelFileName);

    stateToZipMap = new Map();
    let stateToZipMap_excelFileName = 'zip_code_database.xls';
    const stateToZipMap_filePath = path.resolve(directory_name, stateToZipMap_excelFileName);

    filesExist = fs.existsSync(coal_closure_filePath) && fs.existsSync(zipcode_closure_filePath) && fs.existsSync(stateToZipMap_filePath);

    if (filesExist) {
      var coal_closure_workbook = xlsx.readFile(coal_closure_filePath);
      var coal_closure_worksheet = coal_closure_workbook.Sheets[coal_closure_workbook.SheetNames[0]];
      var coal_closure_filedata = xlsx.utils.sheet_to_json(coal_closure_worksheet);
      coal_closure_filedata.forEach((row, index) => {
        countyClosureMap.add(row["County_Name"]);
      });
      //console.log(countyClosureMap);
      var zipcode_closure_workbook = xlsx.readFile(zipcode_closure_filePath);
      var zipcode_closure_worksheet = zipcode_closure_workbook.Sheets[zipcode_closure_workbook.SheetNames[0]];
      var zipcode_closure_filedata = xlsx.utils.sheet_to_json(zipcode_closure_worksheet);
      zipcode_closure_filedata.forEach((row, index) => {
        if(countyClosureMap.has(row["county"])) {
          if(zipToCountyMap.has(row["county"]) == false) {
            zipToCountyMap.set(row["county"], [[],row["state"]]);
          }
          zipToCountyMap.get(row["county"])[0].push(row["zip"]);
          if(stateToZipMap.has(row["state"]) == false) {
            stateToZipMap.set(row["state"], []);
          }
          stateToZipMap.get(row["state"]).push(row["zip"]);
        }
      })
      console.log(stateToZipMap);
    } else {
      console.log(`File(s) not found`);
    }

    //here
    var initialsToStates = new Map();
    initialsToStates.set("CA", "California");
    initialsToStates.set("CO", "Colorado");
    initialsToStates.set("NY", "New York");
    initialsToStates.set("FL", "Florida");
    initialsToStates.set("IL", "Illinois");

    var indexCounter = 0;
    for(var [county, arr] of zipToCountyMap) {
      if(arr[1] == "CA" || arr[1] == "CO" || arr[1] == "NY" || arr[1] == "FL" || arr[1] == "IL") {
        const newEC = await new EC({index: indexCounter, name: "Energy Community Tax Credit Bonus", state: initialsToStates.get(arr[1]), zipcodes: arr[0], description: "Applies a bonus of up to 10% (for production tax credits) or 10 percentage points (for investment tax credits) for projects, facilities, and technologies located in energy communities."});
        // await newEC.save();
        // console.log(newEC);
        indexCounter++;
      }
    }

    /*each element of tribalZipCodes should be an object modeled as such:
    {
      "tribe": "insert tribe name here",
      "state": "insert state here",
      "zipcodes": [insert zipcodes here]
    }
    */
    var tribalZipCodes = [];
    //read in data from csv into tribalZipCodes here

    for(var i = 0; i < tribalZipCodes; i++) {
      if(tribalZipCodes[i].state == "CA" || tribalZipCodes[i].state == "CO" || tribalZipCodes[i].state == "NY" || tribalZipCodes[i].state == "FL" || tribalZipCodes[i].state == "IL") {
        const newTC = await new TC({index: i, name: tribalZipCodes[i].tribe, state: initialsToStates.get(tribalZipCodes[i].state), zipcodes: tribalZipCodes[i].zipcodes, description: "Tribal Community"});
        // await newTC.save();
        console.log(newTC);
      }
    }

    // const data = await fs.readFile('./Data/test.json', 'utf8');
    // const jsonData = JSON.parse(data);
    // await ZipModel.insertMany(jsonData);
    res.send("Data imported successfully");
  } catch (error) {
    console.error("Error during file reading or data import", error);
    res.status(500).send("An error occurred during the import");
  }
});


// {
//   "index": 0,
//   "name": "",
//   "state": "",
//   "zipcodes": [],
//   "description": ""
// }


//refresh database
async function refreshDB() {
    // const today = new Date();
    // const data = await /*new LastUpdated({milliseconds: today.getTime(), year: today.getFullYear(), month: today.getMonth(), day: today.getDate()});*/ LastUpdated.find();
    // console.log(data);
    // // await data.save();
    // if((await LastUpdated.find().where('milliseconds').lt(today.getTime()-2628000000).exec()) != []) {
    //     console.log("works");
    //     console.log(await LastUpdated.find().where('milliseconds').lt(today.getTime()-2628000000).exec());
    // }
}
//test
//all incentives endpoint
//types is an array, with possible values of 'A', 'C', 'T'
// app.get('/all/:types?', async function(req, res) {
//     var types = req.params.type;


// });

// app.get('/byZipcode/:zipcode', async function(req, res) {
//   var zipcode = req.params.zipcode;
//   console.log(zipcode);
//   res.send("kdkdk");
// });

// app.get('/byZipcode', async function(req, res) {
//   console.log("kdkdkdkidoiei");
//   res.send("kdkdk");
// });

//incentives by zip code endpoint
//types is an optional array, with possible element values of 'A', 'C', 'T'
//if no types array is given, will default to all types
app.get('/:zipcode/:types?', async function(req, res) {
    var zipcode = req.params.zipcode;
    var types = req.params.types;
    //JSON.parse(req.params.types);

    var incentives = [];
    if(!types) {
      types = ['A', 'C', 'T'];
    }
    console.log(types);
    // console.log(await TC.find());
    for(var i = 0; i < types.length; i++) {
      var arr = [];
      if(types[i] == 'A') {
        arr = await Adder.find({zipcodes: zipcode});
        console.log("A", arr);
      } else if(types[i] == 'C') {
        arr = await EC.find({zipcodes: zipcode});
        console.log("C", arr);
      } else if(types[i] == 'T') {
        arr = await TC.find({zipcodes: zipcode});
        console.log("T", arr);
      }
      if(arr.length > 0) {
        // console.log("arr again", arr);
        // incentives.concat(arr);
        for(var j = 0; j < arr.length; j++) {
          incentives.push(arr[j]);
        }
        // console.log("Incentives", incentives);
      }
    }
    // console.log(incentives);

    // const newTC = await new TC({index: 3, name: "Resighini Rancheria, California", state: "California", zipcodes: [95548], description: "Tribal Community"})
    // await newTC.save();

    res.send(incentives);
});


//serve front end
app.get('*', (req, res) => {
  //maybe refresh database here
  // refreshDB();
  //make sure to build the front end in order to serve
  // res.sendFile(__dirname + '/../team6/build/index.html');
  // console.log(__dirname);
  res.sendFile(path.resolve('../team6/build/index.html'));
});

// app.use(express.static(__dirname + '/../team6/build'));

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
});

//Becky's zipcode API call
const {MongoClient} = require('mongodb');
const client = new MongoClient(mongoUri, {useNewUrlParser: true, useUnifiedTopology: true});
app.get("/zipcode/:number", async function (req, res) {
  var zip = req.params.number;
  await client.connect();
  const database = client.db("zipcodes");
  const collect = database.collection("zip");
  var obj = await collect.findOne({ "features.properties.ZCTA5CE20" : zip});
  if(!obj) {
    res.send("Object Not Found!").status(404);
  } else {
    res.send(obj).status(200);
  }
});