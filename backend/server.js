const express = require('express');
const PORT = 3001;
const app = express();
var server = require('http').Server(app);
const fs = require('fs');
//const xlsx = require('xlsx');
var path = require('path');

//might need to change later
//currently allows anyone to call endpoints
const cors = require('cors');
app.use(cors());

app.use(express.json());

//MongoDB connection
const mongoose = require('mongoose');
const mongoUri = 'mongodb+srv://jyoungbar02:VvUQMIUhjrqViALD@solar-incentives.08p60z2.mongodb.net/Incentives-Data?retryWrites=true&w=majority';
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
const schema = new mongoose.Schema({ index: { type: Number, unique: true }, name: String, state: { type: String, required: true }, zipcodes: [Number], description: String /*put incentive data here*/ });
const Adder = mongoose.model('adders', schema);
const EC = mongoose.model('energy-communities', schema);
const TC = mongoose.model('tribal-communities', schema);

const adderData = require('./Data/test.json');

const root = path.join(__dirname, '..', 'team6', 'build');
app.use(express.static(root));

function removeTags(str) {
  if ((str === null) || (str === ''))
    return false;
  else {
    str = str.toString();
  }
  return str.replace(/(<([^>]+)>)/ig, '');
}

app.post('/import-json', async (req, res) => {
  try {
    const file = xlsx.readFile('./Data/zip_code_database.xls');
    let data = [];
    const sheets = file.SheetNames;
    for (let i = 0; i < sheets.length; i++) {
      const temp = xlsx.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
    }
    countyClosureMap = new Set();
    let directory_name = './Data/';
    let coal_closure_excelFileName = 'Coal_Closure_Energy_Communities_2023v2.csv';
    const coal_closure_filePath = path.resolve(directory_name, coal_closure_excelFileName);

    zipToCountyMap = new Map();
    let zipcode_closure_excelFileName = 'zip_code_database.xls';
    const zipcode_closure_filePath = path.resolve(directory_name, zipcode_closure_excelFileName);

    stateToZipMap = new Map();
    var cityToZipMap = new Map();
    let stateToZipMap_excelFileName = 'zip_code_database.xls';
    const stateToZipMap_filePath = path.resolve(directory_name, stateToZipMap_excelFileName);

    tribalCommunitiesMap = new Map();
    let tribalCommunitiesMap_excelFileName = 'tribal-leaders-csv.csv';
    const tribalCommunitiesMap_filePath = path.resolve(directory_name, tribalCommunitiesMap_excelFileName);

    filesExist = fs.existsSync(coal_closure_filePath) && fs.existsSync(zipcode_closure_filePath) && fs.existsSync(stateToZipMap_filePath) && fs.existsSync(tribalCommunitiesMap_filePath);

    if (filesExist) {
      var coal_closure_workbook = xlsx.readFile(coal_closure_filePath);
      var coal_closure_worksheet = coal_closure_workbook.Sheets[coal_closure_workbook.SheetNames[0]];
      var coal_closure_filedata = xlsx.utils.sheet_to_json(coal_closure_worksheet);
      coal_closure_filedata.forEach((row, index) => {
        countyClosureMap.add(row["County_Name"]);
      });
      var zipcode_closure_workbook = xlsx.readFile(zipcode_closure_filePath);
      var zipcode_closure_worksheet = zipcode_closure_workbook.Sheets[zipcode_closure_workbook.SheetNames[0]];
      var zipcode_closure_filedata = xlsx.utils.sheet_to_json(zipcode_closure_worksheet);
      zipcode_closure_filedata.forEach((row, index) => {
        if (zipToCountyMap.has(row["county"]) == false) {
          zipToCountyMap.set(row["county"], [[], row["state"]]);
        }
        zipToCountyMap.get(row["county"])[0].push(row["zip"]);
        if (stateToZipMap.has(row["state"]) == false) {
          stateToZipMap.set(row["state"], []);
        }
        stateToZipMap.get(row["state"]).push(row["zip"]);

        if (cityToZipMap.has(row["primary_city"]) == false) {
          cityToZipMap.set(row["primary_city"], []);
        }
        cityToZipMap.get(row["primary_city"]).push(row["zip"]);
      })
      var tribalCommunities_workbook = xlsx.readFile(tribalCommunitiesMap_filePath);
      var tribalCommunities_worksheet = tribalCommunities_workbook.Sheets[tribalCommunities_workbook.SheetNames[0]];
      var tribalCommunities_filedata = xlsx.utils.sheet_to_json(tribalCommunities_worksheet);
      tribalCommunities_filedata.forEach((row, index) => {
        if (tribalCommunitiesMap.has(row["Tribe"]) == false) {
          tribalCommunitiesMap.set(row["Tribe"], [[], row["State"]]);
        }
        tribalCommunitiesMap.get(row["Tribe"])[0].push(row["ZIPCode"]);
      })
    } else {
      console.log(`File(s) not found`);
    }

    var initialsToStates = new Map();
    initialsToStates.set("CA", "California");
    initialsToStates.set("California", "CA");
    initialsToStates.set("CO", "Colorado");
    initialsToStates.set("Colorado", "CO");
    initialsToStates.set("NY", "New York");
    initialsToStates.set("New York", "NY");
    initialsToStates.set("FL", "Florida");
    initialsToStates.set("Florida", "FL");
    initialsToStates.set("IL", "Illinois");
    initialsToStates.set("Illinois", "IL");

    //read in data for Adders
    var indexCounter = 0;
    for (var i = 0; i < adderData.data.length; i++) {
      if (adderData.data[i].State == "New York" || adderData.data[i].State == "Colorado" || adderData.data[i].State == "California" || adderData.data[i].State == "Florida" || adderData.data[i].State == "Illinois") {
        if (removeTags(adderData.data[i].Summary).toString().toLowerCase().indexOf("solar") > -1 && adderData.data[i].CategoryName == 'Financial Incentive') {
          var applicableZipcodes = stateToZipMap.get(initialsToStates.get(adderData.data[i].State));
          if (adderData.data[i].Cities.length > 0 && adderData.data[i].ImplementingSectorName == "Local") {
            applicableZipcodes = cityToZipMap.get(adderData.data[i].Cities[0].name);
          }
          const newAdder = await new Adder({ index: indexCounter, name: removeTags(adderData.data[i].Name), state: removeTags(adderData.data[i].State), zipcodes: applicableZipcodes, description: removeTags(adderData.data[i].Summary) });
          // await newAdder.save();
          indexCounter++;
        }

      }
    }

    //input EC data
    indexCounter = 0;
    for (var [county, arr] of zipToCountyMap) {
      if (arr[1] == "CA" || arr[1] == "CO" || arr[1] == "NY" || arr[1] == "FL" || arr[1] == "IL") {
        const newEC = await new EC({ index: indexCounter, name: "Energy Community Tax Credit Bonus", state: initialsToStates.get(arr[1]), zipcodes: arr[0], description: "Applies a bonus of up to 10% (for production tax credits) or 10 percentage points (for investment tax credits) for projects, facilities, and technologies located in energy communities." });
        // await newEC.save();
        console.log(newEC);
        indexCounter++;
      }
    }

    //input tribal data
    indexCounter = 0;
    for (var [tribe, arr] of tribalCommunitiesMap) {
      if (arr[1] == "CA" || arr[1] == "CO" || arr[1] == "NY" || arr[1] == "FL" || arr[1] == "IL") {
        const newTC = await new TC({ index: indexCounter, name: tribe, state: initialsToStates.get(arr[1]), zipcodes: arr[0], description: "Tribal Community" });
        // await newTC.save();
        indexCounter++;
      }
    }

    res.send("Data imported successfully");
  } catch (error) {
    console.error("Error during file reading or data import", error);
    res.status(500).send("An error occurred during the import");
  }
});


//incentives by zip code endpoint
//types is an optional array, with possible element values of 'A', 'C', 'T'
//if no types array is given, will default to all types
app.get('/incentives/:zipcode/:types?', async function (req, res) {
  var zipcode = req.params.zipcode;
  var types = req.params.types;

  var incentives = [];
  if (!types) {
    types = ['A', 'C', 'T'];
  }
  console.log(types);
  for (var i = 0; i < types.length; i++) {
    var arr = [];
    if (types[i] == 'A') {
      arr = await Adder.find({ zipcodes: zipcode });
      console.log("A", arr);
    } else if (types[i] == 'C') {
      arr = await EC.find({ zipcodes: zipcode });
      console.log("C", arr);
    } else if (types[i] == 'T') {
      arr = await TC.find({ zipcodes: zipcode });
      console.log("T", arr);
    }
    if (arr.length > 0) {
      for (var j = 0; j < arr.length; j++) {
        incentives.push(arr[j]);
      }
    }
  }

  res.send(incentives);
});

//zipcode API call for geospatial data
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://jyoungbar02:VvUQMIUhjrqViALD@solar-incentives.08p60z2.mongodb.net/";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
app.get("/zipcode/:number", async function (req, res) {
  var zip = req.params.number;
  await client.connect();
  const database = client.db("zipcodes");
  const collect = database.collection("zip");
  var obj = await collect.findOne({ "features.properties.ZCTA5CE20": zip });
  if (!obj) {
    res.send("Object Not Found!").status(404);
  } else {
    res.send(obj).status(200);
  }
});


//serve front end
app.get('*', (req, res) => {
  //maybe refresh database here
  //make sure to build the front end in order to serve
  res.sendFile(path.resolve('../team6/build/index.html'));
});

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
});