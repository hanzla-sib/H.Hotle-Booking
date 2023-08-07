const mongoose = require("mongoose");

const PlacedSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  address: String,
  photos: [String],
  description: String,
  perks: [String],
  extrainfo: String,
  checkIn: Number,
  checkout: Number,
  MaxGuests: Number,
  price:Number
});

const PlaceModel = mongoose.model("place", PlacedSchema);

module.exports = PlaceModel;
