const db = require('../Config/db');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const LeadsSchema = new Schema({
  lead_id: String,
  origin: String,
  name: String,
  email: String,
  phone: Number,
  city: String,
  state: String,
  follow_up: String,
  note: String,
  status: String
}, { timestamps: true });

const LeadsModel = db.model('Leads', LeadsSchema);
module.exports = LeadsModel;
