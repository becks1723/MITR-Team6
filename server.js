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
// mongoose.connect("link to cluster here")
const schema = new mongoose.Schema({index: Number/*,*/ /*put incentive data here*/});
// const Model = mongoose.model('name of db here', schema)


//serve front end
app.get('/*', (req, res) => {
    //maybe refresh database here

    //make sure to build the front end in order to serve
    res.sendFile(__dirname + '/team6/build/index.html');
});


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