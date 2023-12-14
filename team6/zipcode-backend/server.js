//imports
const express = require('express')
const app = express()
const {MongoClient} = require('mongodb');

const port = 5000

const uri = "mongodb+srv://jyoungbar02:VvUQMIUhjrqViALD@solar-incentives.08p60z2.mongodb.net/";
const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});

var json1 = require('./zipcodes-ny.json');
var json2 = require('./zipcodes-ca.json');
var json3 = require('./zipcodes-fl.json');
var json4 = require('./zipcodes-il.json');


//This part of the code connects to the backend!

async function main() {
  try {
    await client.connect();
    //await dataMassAdd(client);
  } catch (e) {
    console.error(e);
    console.log("not working");
  } finally {
    await client.close();
  }
}
main().catch(console.error);

//------------------------------------------------------------------------------------------------------------------

async function dataMassAdd(client) {
  const database = client.db("zipcodes");
  const collect = database.collection("zip");

  for (const feature of json1.features) {
    try {
      await collect.insertOne({
        "type": "FeatureCollection",
        "name": "zipcodes",
        "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:EPSG::4269" } },
        "features": [feature] // Insert each feature separately
      });
    } catch (error) {
      console.error("Error inserting feature:", error);
    }
  }

  for (const feature of json2.features) {
    try {
      await collect.insertOne({
        "type": "FeatureCollection",
        "name": "zipcodes",
        "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:EPSG::4269" } },
        "features": [feature] // Insert each feature separately
      });
    } catch (error) {
      console.error("Error inserting feature:", error);
    }
  }

  for (const feature of json3.features) {
    try {
      await collect.insertOne({
        "type": "FeatureCollection",
        "name": "zipcodes",
        "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:EPSG::4269" } },
        "features": [feature] // Insert each feature separately
      });
    } catch (error) {
      console.error("Error inserting feature:", error);
    }
  }

  for (const feature of json4.features) {
    try {
      await collect.insertOne({
        "type": "FeatureCollection",
        "name": "zipcodes",
        "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:EPSG::4269" } },
        "features": [feature] // Insert each feature separately
      });
    } catch (error) {
      console.error("Error inserting feature:", error);
    }
  }

}


//------------------------------------------------------------------------------------------------------------------

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


//listen on port 3000
app.listen(port, () => console.info('Starting server...'));