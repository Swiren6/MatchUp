const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users",

  },

  title:{
    type: String,
  },
  phone:{
    type: String,
  },
  country:{
    type: String,
  },
  pictures:{
    type: String,
  },
  bio:{
    type: String,
  },
  github:{
    type: String,
  },
  skills:{
    type: [String],
  },
  cvLink:{
    type: String,
  },
  educations:[
    {
      from : String,
      to: String,
      description: String,
      degree:String,
      location: String,
  },
],
  experiences: [
    {
      title: String,
      from : String,
      to: String,
      description: String,
      company:String,
      location: String,
  },
],
socials:{
  facebook: String,
  linkedin: String,
  twitter: String,
},

likes:[
  {
    userId:string,
    liker:string,
  },
],


});

module.exports = mongoose.model("profiles", profileSchema);
