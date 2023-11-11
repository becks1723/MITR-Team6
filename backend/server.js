const express = require('express');
const PORT = process.env.PORT || 3001
const app = express()
var server = require('http').Server(app);

//might need to change later
//currently allows anyone to call endpoints
const cors = require('cors');
app.use(cors());

app.use(express.json());

//MongoDB connection
const mongoose = require('mongoose');
//Might need to change this user from jyoungbar02 to some sort of admin account to hand over
// mongoose.connect("mongodb+srv://jyoungbar02:VvUQMIUhjrqViALD@solar-incentives.08p60z2.mongodb.net/?retryWrites=true&w=majority");
const connection = mongoose.createConnection("mongodb+srv://jyoungbar02:VvUQMIUhjrqViALD@solar-incentives.08p60z2.mongodb.net/?retryWrites=true&w=majority");
const schema = new mongoose.Schema({index: Number/*,*/ /*put incentive data here*/});
const Adder = mongoose.model('Adders', schema);
const EC = mongoose.model('Energy-Communities', schema);
const TC = mongoose.model('Tribal-Communities', schema);
const timeSchema = new mongoose.Schema({/*_id: {type: ObjectID, required: true}, index: {type: Int32, required: true},*/ milliseconds: {type: Number/*INT32*/, required: true}, year: {type: Number/*INT32*/, required: true}, month: {type: Number/*INT32*/, required: true}, day: {type: Number/*INT32*/, required: true}});
const LastUpdated = /*mongoose*/connection.model('Last-Updated', timeSchema);

const fs = require("fs");
const { parse } = require("csv-parse");
app.use(bodyParser.json());
const path = require('path');
fs.createReadStream("./data/mydata.csv")
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", async function (row) {
//    Create an instance of the DataPath model and save the data to the database
    const data = new PowerPlant({
      country: row[0],
      country_long: row[1],
      name: row[2],
      gppd_idnr: row[3],
      capacity_mw: row[4],
      latitude: row[5],
      longitude: row[6],
      primary_fuel: row[7],
      other_fuel1: row[8],
      other_fuel2: row[9],
      other_fuel3: row[10],
      commissioning_year: row[11],
      owner: row[12],
      source: row[13],
      url: row[14],
      geolocation_source: row[15],
      wepp_id: row[16],
      year_of_capacity_data: row[17],
      generation_gwh_2013: row[18],
      generation_gwh_2014: row[19],
      generation_gwh_2015: row[20],
      generation_gwh_2016: row[21],
      generation_gwh_2017: row[22],
      generation_gwh_2018: row[23],
      generation_gwh_2019: row[24],
      generation_data_source: row[25],
      estimated_generation_gwh_2013: row[26],
      estimated_generation_gwh_2014: row[27],
      estimated_generation_gwh_2015: row[28],
      estimated_generation_gwh_2016: row[29],
      estimated_generation_gwh_2017: row[30],
      estimated_generation_note_2013: row[31],
      estimated_generation_note_2014: row[32],
      estimated_generation_note_2015: row[33],
      estimated_generation_note_2016: row[34],
      estimated_generation_note_2017: row[35],
    });
//     console.log(data.country_long);
//     // await data.save(); // Save the data to the databaseß
  })
  .on("end", function () {
    console.log("done");
  });

//serve front end
app.get('*', (req, res) => {
    //maybe refresh database here
    refreshDB();
    //make sure to build the front end in order to serve
    res.sendFile(__dirname + '/team6/build/index.html');
});


//refresh database
async function refreshDB() {
    const today = new Date();
    const data = await /*new LastUpdated({milliseconds: today.getTime(), year: today.getFullYear(), month: today.getMonth(), day: today.getDate()});*/ LastUpdated.find();
    console.log(data);
    // await data.save();
    if((await LastUpdated.find().where('milliseconds').lt(today.getTime()-2628000000).exec()) != []) {
        console.log("works");
        console.log(await LastUpdated.find().where('milliseconds').lt(today.getTime()-2628000000).exec());
    }
}

//all incentives endpoint
//types is an array, with possible values of 'A', 'C', 'T'
app.get('/all/:types?', async function(req, res) {
    var types = req.params.type;


});

//incentives by zip code endpoint
//types is an array, with possible values of 'A', 'C', 'T'
app.get('/:zipcode/:types?', async function(req, res) {
    var zipcode = req.params.zipcode;
    var types = req.params.types;

});

app.use(express.static(__dirname + '/team6/build'));

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
});