const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const Schema = mongoose.Schema;

const dataSchema = new Schema({
  country: { type: String },
  country_long: { type: String },
  name: { type: String, required: true },
  gppd_idnr: { type: String },
  capacity_mw: { type: Number },
  latitude: { type: Number },
  longitude: { type: Number },
  primary_fuel: { type: String },
  other_fuel1: { type: String },
  other_fuel2: { type: String },
  other_fuel3: { type: String },
  commissioning_year: { type: Number },
  owner: { type: String },
  source: { type: String },
  url: { type: String },
  geolocation_source: { type: String },
  wepp_id: { type: String },
  year_of_capacity_data: { type: Number },
  generation_gwh_2013: { type: Number },
  generation_gwh_2014: { type: Number },
  generation_gwh_2015: { type: Number },
  generation_gwh_2016: { type: Number },
  generation_gwh_2017: { type: Number },
  generation_gwh_2018: { type: Number },
  generation_gwh_2019: { type: Number },
  generation_data_source: { type: String },
  estimated_generation_gwh_2013: { type: Number },
  estimated_generation_gwh_2014: { type: Number },
  estimated_generation_gwh_2015: { type: Number },
  estimated_generation_gwh_2016: { type: Number },
  estimated_generation_gwh_2017: { type: Number },
  estimated_generation_note_2013: { type: String },
  estimated_generation_note_2014: { type: String },
  estimated_generation_note_2015: { type: String },
  estimated_generation_note_2016: { type: String },
  estimated_generation_note_2017: { type: String },
}, { timestamps: true });

const PowerPlant = mongoose.model('PowerPlant', dataSchema);
module.exports = PowerPlant;