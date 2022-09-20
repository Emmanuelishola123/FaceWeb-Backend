const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: false },
  user_id: {
    type: String,
    required: false,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true },
  photo_url: {
    type: String,
    default: "",
  },
  verified: { type: Boolean, default: false },
  followers: { type: [Schema.Types.ObjectId], default: [] },
  following: { type: [Schema.Types.ObjectId], default: [] },
});

module.exports = mongoose.model("Users", userSchema);
