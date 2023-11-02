//imports
const express = require('express')
const app = express()
const {MongoClient} = require('mongodb');
//var d3 = require("d3");


const port = 3000

const uri = "mongodb+srv://chenb9:123123123@zipcode.tiis4hg.mongodb.net/";
const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});

//This part of the code connects to the backend!

async function main() {
  try {
    await client.connect();
    //await dataAddTest(client);
    //await dataAddMass(client);
  } catch (e) {
    console.error(e);
    console.log("not working");
  } finally {
    await client.close();
  }
}
main().catch(console.error);

//------------------------------------------------------------------------------------------------------------------

//Adding in the data from the geojson
async function dataAddTest(client) {

}

async function dataAddMass(client) {


}


async function massDataOpenMeteo(client) {
  const database = client.db("WebSci");
  const collect = database.collection("Lab6");
  for(var i = 200; i < 300; i++) {
    //Generating random numbers for longitude and latitude
    var lon = Math.random() * (180 - -180) + -180;
    lon = Math.round(lon * 100) / 100
    var lat = Math.random() * (90 - -90) + -90;
    lat = Math.round(lat * 100) / 100
    try {
      const data = await fetch("https://api.open-meteo.com/v1/forecast?latitude="+ lat +"&longitude="+ lon +"&temperature_unit=fahrenheit&current_weather=true");
      const dataParsed = await data.json();
      // console.log(dataParsed);
      const lon1 = dataParsed.longitude;
      const lat1 = dataParsed.latitude;
      const temp = dataParsed.current_weather.temperature;
      //console.log(coord, weather, temp);
      await collect.insertOne({
        key: i,
        longitude: lon1,
        latitude: lat1,
        temperature: temp,
      });
    }
    catch(error) {
      i--;
    }
  }
}

//------------------------------------------------------------------------------------------------------------------

app.get("/db/:number", async function (req, res) {
  var totalNumber = req.params.number;
  await client.connect();
  const database = client.db("WebSci");
  const collect = database.collection("Lab6");
  var obj = await collect.findOne({key: parseInt(totalNumber)});
  if(!obj) {
    res.send("Object Not Found!").status(404);
  } else {
    res.send(obj).status(200);
  }
});

app.get("/db", async function (req, res) {
  await client.connect();
  const database = client.db("WebSci");
  const collect = database.collection("Lab6");
  var obj = await collect.find().toArray();
  if(!obj) {
    res.send("Objects Not Found!").status(404);
  } else {
    res.send(obj).status(200);
  }
});

//listen on port 3000
app.listen(port, () => console.info('Starting server...'));