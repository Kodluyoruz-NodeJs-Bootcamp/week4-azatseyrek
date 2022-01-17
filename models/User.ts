import mongoose from "mongoose";
import isEmail from "validator";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  surname: {
    type: String,
    require: true,
  },
});

// Create Model
const User = mongoose.model("user", userSchema);

export default User;
