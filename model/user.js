const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true, min: 6, max: 255},
  last_name: { type: String, required: true, min: 6, max: 255},
  email: { type: String, unique: true, required: true, min: 6, max: 255 },
  password: { type: String, required: true, min: 6, max: 255 },
  date: {type: Date, default: Date.now()}, 
  token: { type: String },
});

module.exports = mongoose.model("user", userSchema);
