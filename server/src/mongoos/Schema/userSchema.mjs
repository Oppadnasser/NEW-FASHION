import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: mongoose.Schema.Types.String,
    length: {
      max: 35,
    },
  },
  lastName: {
    type: mongoose.Schema.Types.String,
    length: {
      max: 35,
    },
  },

  dateOfBirth: mongoose.Schema.Types.Date,
  password: {
    type: mongoose.Schema.Types.String,
    require: true,
  },
  phone: mongoose.Schema.Types.String,
  address: mongoose.Schema.Types.String,
  email: mongoose.Schema.Types.String,
  sessionid: mongoose.Schema.Types.String,
  userType: mongoose.Schema.Types.String,
});

export const User = mongoose.model("Users", userSchema);
