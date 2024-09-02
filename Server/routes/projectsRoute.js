const express = require('express');
const jwt = require('jsonwebtoken');
const projectRouter = express.Router();
const Projects = require('../models/projects')
const Enquiry= require('../models/enquiry')
const hashPassword = require('../helpers/auth')
const bcrypt = require('bcrypt')
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
    const { handOverYear, jjbuilt, location, underWarranty, visitDate,workNature } = req.body; 
    try {
      if (!handOverYear || !location || !workNature) {
        return res.status(400).json({ error: 'All fields are required' });
      }
      // Create a new enquiry instance
      const newEnquiry = new Enquiry({
        handOverYear, 
        jjbuilt, 
        location, 
        underWarranty, 
        visitDate,
        workNature
      });
      console.log('new Enquiry', newEnquiry)
      // Save to the database
      const savedEnquiry = await newEnquiry.save();
      res.status(201).json({ message: 'Enquiry created successfully', enquiry: savedEnquiry });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Failed to create Enquiry' });
    }
  });

  module.exports = projectRouter;
