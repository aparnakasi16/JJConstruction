const mongoose = require('mongoose');
const { Schema } = mongoose;

const projectSchema = new Schema({
    sqft: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    bhk: {
      type: Number,
      required: true, // Assuming BHK is a number representing bedrooms
    },
    location: {
      type: String,
      required: true,
    },
    image: {
      type: String, // You can store image URLs as strings
      required: false, // Not required if images are optional
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
// export default mongoose.model("User", userSchema);
module.exports = mongoose.model('Projects', projectSchema)


