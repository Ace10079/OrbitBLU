const db = require('../Config/db');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const TicketsSchema = new Schema({
  ticket_id: String,
  name: String,
  complaint: String,
  priority: String,
  note: String,
  status: String,
  assign_ticket: String
}, { timestamps: true });

const TicketsModel = db.model('Tickets', TicketsSchema);
module.exports = TicketsModel;
