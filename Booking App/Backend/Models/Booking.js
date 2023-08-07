const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  place: { type: mongoose.Schema.Types.ObjectId, ref: "place",},
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  checkin: { type: Date, required: true },
  checkout: { type: Date, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  price: Number,
  days: Number,
  Noguests: Number,
});

const BookingModal = mongoose.model("Booking", BookingSchema);

module.exports = BookingModal;
