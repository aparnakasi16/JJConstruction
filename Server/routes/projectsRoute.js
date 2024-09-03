const express = require('express');
const jwt = require('jsonwebtoken');
const projectRouter = express.Router();
const Projects = require('../models/projects')
const Enquiry= require('../models/enquiry')
const nodemailer = require('nodemailer');
const hashPassword = require('../helpers/auth')
const bcrypt = require('bcrypt')
const Counter = require('../models/counter')
const mongoose = require('mongoose');

const getNextSequenceValue = async (sequenceName) => {
  const counter = await Counter.findOneAndUpdate(
    { _id: sequenceName },
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true } // upsert creates the counter if it doesn't exist
  );
  return counter.sequence_value;
};

const transporter = nodemailer.createTransport({
  service: 'gmail', // or use another service, e.g., outlook, yahoo
  auth: {
    user: 'aparnakasi16@gmail.com', // your email
    pass: 'kttk eeow zsov zrln' // your email password or an app password for better security
  }
});
projectRouter.post('/addNewProject', async (req, res) => {
    const { sqft, description, bhk, location, image } = req.body; 
    try {
      // Create a new house instance
      const newHouse = new Projects({
        sqft,
        description,
        bhk,
        location,
        image,
      });
  
      // Save to the database
      const savedHouse = await newHouse.save();
  
      return res.status(201).json(savedHouse);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Failed to create house' });
    }
  });

  projectRouter.post('/newEnquiry', async (req, res) => {
    const { handOverYear, jjbuilt, location, underWarranty, visitDate,workNature,username,phone,userId } = req.body; 
    try {
      if (!handOverYear || !location || !workNature) {
        return res.status(400).json({ error: 'All fields are required' });
      }
    const enquiryId = await getNextSequenceValue('enquiryId');

      // Create a new enquiry instance
      const newEnquiry = new Enquiry({
        enquiryId,
        handOverYear, 
        jjbuilt, 
        location, 
        underWarranty, 
        visitDate,
        workNature,
        username,
        phone,
        userId,
        status:'Open',
      });
      console.log('new Enquiry', newEnquiry)
      // Save to the database
      const savedEnquiry = await newEnquiry.save();
        // Send email after creating enquiry
        const mailOptions = {
          from: 'aparna.kasi611@gmail.com', // sender address
          to: 'aparna.kasi611@gmail.com', // recipient email
          subject: 'New Enquiry for service has been Update', // subject line
          text: `A new service enquiry has been created with the following details:
          \nClient Name: ${savedEnquiry.username}
          \nPhone: ${savedEnquiry.phone}
          \nHand Over Year: ${savedEnquiry.handOverYear}
          \nJJBuilt: ${savedEnquiry.jjbuilt}
          \nLocation: ${savedEnquiry.location}
          \nUnder Warranty: ${savedEnquiry.underWarranty}
          \nVisit Date: ${savedEnquiry.visitDate}
          \nWork Nature: ${savedEnquiry.workNature}`
        };
  
        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ error: 'Error sending email' });
          } else {
            console.log('Email sent:', info.response);
            return res.status(201).json({
              message: 'Enquiry created successfully and email sent',
              enquiry: savedEnquiry,
              success: true
            });
          }
        });
      // res.status(201).json({ message: 'Enquiry created successfully', enquiry: savedEnquiry });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Failed to create Enquiry', success: false });
    }
  });

  projectRouter.get('/enquiries/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
  
      // Find user by phone number
      const enquiries = await Enquiry.findOne({ userId: userId });
  
      if (!enquiries) {
        return res.status(404).json({ error: 'No Enquires found' });
      }
  
      // Return user data
      return res.json({
        enquiries,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Server error' });
    }
  });

  projectRouter.put('/updateEnquiryStatus/:enquiryId', async (req, res) => {
    const { status } = req.body;
    const { enquiryId } = req.params;
  
    try {
      // Validate input
      if (!status) {
        return res.status(400).json({ error: 'Status field is required' });
      }
  
      // Validate if enquiryId is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(enquiryId)) {
        return res.status(400).json({ error: 'Invalid enquiry ID' });
      }
  
      // Find the enquiry by ID and update the status
      const updatedEnquiry = await Enquiry.findByIdAndUpdate(
        enquiryId,
        { status: status }, // Update the status field
        { new: true } // Return the updated document
      );
  
      if (!updatedEnquiry) {
        return res.status(404).json({ error: 'Enquiry not found', success: false });
      }
  
      return res.status(200).json({
        message: 'Enquiry status updated successfully',
        enquiry: updatedEnquiry,
        success: true
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to update enquiry status', success: false });
    }
  });
  

  module.exports = projectRouter;
