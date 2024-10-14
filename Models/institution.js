const db = require('../Config/db');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const InstitutionSchema = new Schema({
  institution_id: String,
  institution_name: String,
  email: { type: String, unique: true, required: true },
  spoc_name: String,
  spoc_phone: Number,
  address: String,
  district: String,
  state: String,
  status: String,
  credit: String,
  password: String
}, { timestamps: true });

const InstitutionModel = db.model('Institution', InstitutionSchema);
module.exports = InstitutionModel;
