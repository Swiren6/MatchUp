// models/Offer.js
const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  title: String,
  description: String,
  budget: String,
  skills: [String],
  status: String,
});

const Offer = mongoose.model('Offer', offerSchema);

module.exports = Offer;
