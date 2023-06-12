const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');

app.use(express.json());
app.use(cors());

// Define a POST route to handle the registration data
app.post('/register', (req, res) => {
  const registrationData = req.body;

  // Read the existing data from the JSON file
  let existingData = [];
  try {
    const data = fs.readFileSync('registrations.json');
    existingData = JSON.parse(data);
  } catch (error) {
    console.error('Error reading registrations:', error);
  }

  // Add the new registration data to the existing data
  existingData.push(registrationData);

  // Write the updated data back to the JSON file
  try {
    fs.writeFileSync('registrations.json', JSON.stringify(existingData, null, 2));
    console.log('Registration data saved successfully!');
  } catch (error) {
    console.error('Error saving registration data:', error);
  }

  res.sendStatus(200);
});

// Define a POST route to handle the login data
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Read the existing data from the JSON file
  let registrations = [];
  try {
    const data = fs.readFileSync('registrations.json');
    registrations = JSON.parse(data);
  } catch (error) {
    console.error('Error reading registrations:', error);
  }

  // Check if the provided username and password match any registration data
  const user = registrations.find((registration) => registration.username === username && registration.password === password);

  if (user) {
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});

// Define a POST route to handle the student data
app.post('/students', (req, res) => {
  const studentData = req.body;

  // Read the existing data from the JSON file
  let existingData = [];
  try {
    const data = fs.readFileSync('students.json');
    existingData = JSON.parse(data);
  } catch (error) {
    console.error('Error reading student data:', error);
  }

  // Add the new student data to the existing data
  existingData.push(studentData);

  // Write the updated data back to the JSON file
  try {
    fs.writeFileSync('students.json', JSON.stringify(existingData, null, 2));
    console.log('Student data saved successfully!');
  } catch (error) {
    console.error('Error saving student data:', error);
  }

  res.sendStatus(200);
});

// Set the Access-Control-Allow-Origin header for all routes
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  next();
});

// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
