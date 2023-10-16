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
mongoose.connect("mongodb+srv://jyoungbar02:VvUQMIUhjrqViALD@solar-incentives.08p60z2.mongodb.net/?retryWrites=true&w=majority");
const schema = new mongoose.Schema({index: Number/*,*/ /*put incentive data here*/});
const Adder = mongoose.model('Adders', schema);
const EC = mongoose.model('Energy-Communities', schema);
const TC = mongoose.model('Tribal-Communities', schema);
const timeSchema = new mongoose.Schema({milliseconds: {type: Number, required: true}, year: {type: Number, required: true}, month: {type: Number, required: true}, day: {type: Number, required: true}});
const LastUpdated = mongoose.model('Last-Updated', timeSchema);

//serve front end
app.get('/*', (req, res) => {
    //maybe refresh database here
    refreshDB();
    //make sure to build the front end in order to serve
    res.sendFile(__dirname + '/team6/build/index.html');
});


//refresh database
async function refreshDB() {
    const today = new Date();
    if(await LastUpdated.find().where('milliseconds').lt(today.getTime()-2628000000).exec() != []) {
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