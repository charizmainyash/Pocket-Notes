const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserSchema = new Schema({
  //Adding foreign key as below
  user: {
    type: mongoose.Schema.Types.ObjectId,  //This make link every user with notes with key as object id
    ref: "user",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    default: "General",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("notes", UserSchema);
