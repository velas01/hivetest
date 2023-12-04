/*import mongoose, { connect, model } from 'mongoose';
import express, { json } from 'express';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(json());
app.use(cors());

connect('mongodb+srv://bhumika871999:8719@cluster0.gd32opn.mongodb.net/contactFormDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a mongoose schema
const contactSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  email: String,
  mobile: String,
});

// Create a mongoose model
const Contact = model('Contact', contactSchema);

// Handle form submissions
app.post('/contactus', async (req, res) => {
  const { fname, lname, email, mobile } = req.body;

  if (!fname || !lname || !email || !mobile) {
    return res.json({ success: false, message: 'Please fill in all the required fields!' });
  }

  try {
    const contact = new Contact({ fname, lname, email, mobile });
    await contact.save();
    res.json({ success: true, message: 'Form submitted successfully!' });
  } catch (error) {
    console.error('Error saving contact form data:', error);
    res.json({ success: false, message: 'Error submitting form. Please try again.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
}); */

// server.js

import express from 'express';
import { connect, Schema, model } from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(bodyParser.json())
app.use(cors({
  origin: 'http://localhost:3000',
}));

// Connect to MongoDB Atlas
connect('mongodb+srv://bhumika871999:8719@cluster0.gd32opn.mongodb.net/contactFormDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('Error connecting to MongoDB Atlas:', err));

// Create a schema for the contact form data
const contactFormSchema = new Schema({
  fullName: String,
  email: String,
  mobile: String,
  message: String,
});

const ContactForm = model('ContactForm', contactFormSchema);



// Endpoint to handle form submissions
app.post('/submit-form', async (req, res) => {
  try {
    const { fullName, email, mobile, message } = req.body;

    // Create a new instance of ContactForm model
    const newFormSubmission = new ContactForm({
      fullName,
      email,
      mobile,
      message,
    });

    // Save the form data to MongoDB
    await newFormSubmission.save();

    // Sending a success response
    res.status(200).json({ success: true, message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ success: false, message: 'Error submitting form. Please try again.' });
  }
});

const PORT = 3001; // Choose your desired port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
