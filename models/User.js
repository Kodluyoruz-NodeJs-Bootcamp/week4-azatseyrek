const mongoose = require("mongoose");

// create Schema

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    require: true,
    minLength: 6,
  },
});

// Create Model
const User = mongoose.model("user", userSchema);

module.exports = User;
