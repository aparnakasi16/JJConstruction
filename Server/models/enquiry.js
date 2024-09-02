const mongoose = require('mongoose');
const { Schema } = mongoose;
const enquirySchema = new Schema({
    handOverYear: {
      type: String,
      required: true,
    },
    jjbuilt:{
      type: Boolean,
      required: true,
    },
    location:{
      type: String,
      required: true,
    },
    underWarranty: {
      type: Boolean,
      required: true,
    },
    visitDate: {
      type: Date,
      required: true, 
    },
    workNature: {
      type: String,
      required: true,
    },
    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    // },
  });
module.exports = mongoose.model('Enquiry', enquirySchema)