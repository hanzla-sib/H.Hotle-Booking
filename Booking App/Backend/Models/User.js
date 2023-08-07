const mongoose = require("mongoose");
const { Schema } = mongoose;

const userschema = new Schema({
  name: String,
  password: String,
  email: { type: String, unique: true },
 
});
const User_modal = mongoose.model("User", userschema);
module.exports=User_modal;