import mongoose from "mongoose";

const googleUserSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    require: true,
  },
  Name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    unique: true,
    require: true,
  },
  sessionid: mongoose.Schema.Types.String,
});

export const googleUser = mongoose.model("GoogleUser", googleUserSchema);
