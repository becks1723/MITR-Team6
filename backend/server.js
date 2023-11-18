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
const fs = require('fs');
const ZipModel = require('./Models/zipModel');
const mongoUri = 'mongodb+srv://jyoungbar02:VvUQMIUhjrqViALD@solar-incentives.08p60z2.mongodb.net/?retryWrites=true&w=majority'; 
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
// const schema = new mongoose.Schema({index: Number/*,*/ /*put incentive data here*/});
// const Adder = mongoose.model('Adders', schema);
// const EC = mongoose.model('Energy-Communities', schema);
// const TC = mongoose.model('Tribal-Communities', schema);
// const timeSchema = new mongoose.Schema({/*_id: {type: ObjectID, required: true}, index: {type: Int32, required: true},*/ milliseconds: {type: Number/*INT32*/, required: true}, year: {type: Number/*INT32*/, required: true}, month: {type: Number/*INT32*/, required: true}, day: {type: Number/*INT32*/, required: true}});
// const LastUpdated = /*mongoose*/connection.model('Last-Updated', timeSchema);

app.post('/import-json', async (req, res) => {
  try {
    const data = await fs.readFile('./Data/test.json', 'utf8');
    const jsonData = JSON.parse(data);
    await ZipModel.insertMany(jsonData);
    res.send("Data imported successfully");
  } catch (error) {
    console.error("Error during file reading or data import", error);
    res.status(500).send("An error occurred during the import");
  }
});

var path = require('path');
const root = path.join(__dirname, '..', 'team6', 'build');
app.use(express.static(root));
//serve front end
app.get('*', (req, res) => {
    //maybe refresh database here
    // refreshDB();
    //make sure to build the front end in order to serve
    // res.sendFile(__dirname + '/../team6/build/index.html');
    // console.log(__dirname);
    res.sendFile(path.resolve('../team6/build/index.html'));
});


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
app.get('/all/:types?', async function(req, res) {
    var types = req.params.type;


});

//incentives by zip code endpoint
//types is an array, with possible values of 'A', 'C', 'T'
app.get('/:zipcode/:types?', async function(req, res) {
    var zipcode = req.params.zipcode;
    var types = req.params.types;

});

// app.use(express.static(__dirname + '/../team6/build'));

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
});