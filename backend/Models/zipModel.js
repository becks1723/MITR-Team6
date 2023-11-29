const mongoose = require('mongoose');
const { Schema } = mongoose;

// Sub-document schema for Technologies
const technologySchema = new Schema({
  id: Number,
  name: String,
  category: String,
  categoryId: Number,
  energyCategoryId: Number
});

// Sub-document schema for Sectors
const sectorSchema = new Schema({
  id: Number,
  name: String,
  parentId: Number,
  selectable: Boolean,
  countChildren: Number,
  children: Array
});

// Sub-document schema for Contacts
const contactSchema = new Schema({
  id: Number,
  contact: {
    id: Number,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    organizationName: String,
    webVisibleDefault: Boolean,
    websiteUrl: String,
    address: String,
    city: String,
    state: Number,
    stateObject: {
      id: Number,
      name: String,
      abbreviation: String,
      is_territory: Boolean
    },
    zip: String
  },
  program: Number,
  webVisible: Boolean
});

// Sub-document schema for Authorities
const authoritySchema = new Schema({
  id: Number,
  code: String,
  website: String,
  upload: {
    key: String,
    fileName: String,
    url: String
  },
  effectiveDate: String,
  effectiveDateDisplay: String,
  effectiveText: String,
  enactedDate: String,
  enactedDateDisplay: String,
  enactedText: String,
  expiredDate: String,
  expiredDateDisplay: String,
  expiredText: String
});

// Main document schema for Program
const zipSchema = new Schema({
  ProgramId: Number,
  Code: String,
  State: String,
  ImplementingSectorId: Number,
  ImplementingSectorName: String,
  CategoryId: Number,
  CategoryName: String,
  TypeId: Number,
  TypeName: String,
  Name: String,
  LastUpdate: String,
  WebsiteUrl: String,
  Administrator: String,
  FundingSource: String,
  Budget: String,
  StartDate: String,
  EndDate: String,
  Utilities: Array,
  Counties: Array,
  Cities: Array,
  ZipCodes: Array,
  Technologies: [technologySchema],
  Sectors: [sectorSchema],
  Contacts: [contactSchema],
  ProgramParameters: Array,
  Details: Array,
  Authorities: [authoritySchema],
  Summary: String,
  FromSir: Boolean
});

const ZipCode = mongoose.model('ZipCode', zipSchema);
module.exports = ZipCode;