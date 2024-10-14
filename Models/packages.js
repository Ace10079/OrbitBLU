const db = require('../Config/db');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const PackagesSchema = new Schema({
  package_id: String,
  package_name: String,
  pricing: Number,
  credit: Number,
  description: String,
  status: String
}, { timestamps: true });

const PackagesModel = db.model('Packages', PackagesSchema);
module.exports = PackagesModel;
