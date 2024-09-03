const mongoose = require('mongoose');
const {Schema} = mongoose;
const userSchema = new Schema(
  {
    userId: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 64,
    },
    phone: {
      type: String,
      required: true,
      min: 10,
      max: 10,
    },
    address: {
      type: String,
      trim: true,
      required: true,
      unique: false,
    },
    // role: {
    // type: String,
    // default: "User",
    // },
  },
  {timestamps: true},
);
// export default mongoose.model("User", userSchema);
module.exports = mongoose.model('User', userSchema);
