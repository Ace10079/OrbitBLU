const db = require('../Config/db');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const EnquiriesSchema = new Schema({
  enquiry_id: String,
  name: String,
  phone: String,
  email: String,
  institution: String,
  subject: String,
  note: String,
  status: String
}, { timestamps: true });
const EnquiriesModel = db.model('Enquiries', EnquiriesSchema);
module.exports = EnquiriesModel;
