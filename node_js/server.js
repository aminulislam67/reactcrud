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
    res.sendStatus(200);
  } catch (error) {
    console.error('Error saving registration data:', error);
    res.sendStatus(500);
  }
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

  // Generate a unique ID for the new student
  const newStudentId = Math.max(0, ...existingData.map(student => student.studentId)) + 1;
  studentData.studentId = newStudentId;

  // Add the new student data to the existing data
  existingData.push(studentData);

  // Write the updated data back to the JSON file
  try {
    fs.writeFileSync('students.json', JSON.stringify(existingData, null, 2));
    console.log('Student data saved successfully!');
    res.sendStatus(200);
  } catch (error) {
    console.error('Error saving student data:', error);
    res.sendStatus(500);
  }
});

// Define a GET route to fetch paginated students
app.get('/students', (req, res) => {
  const page = parseInt(req.query.page) || 1; // Get the page number from the query parameters
  const pageSize = 2; // Define the number of students to display per page

  try {
    const data = fs.readFileSync('students.json');
    const students = JSON.parse(data);

    const totalStudents = students.length;
    const totalPages = Math.ceil(totalStudents / pageSize);

    // Calculate the starting and ending indices for the current page
    const startIndex = (page - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, totalStudents);

    // Get the students for the current page
    const currentPageStudents = students.slice(startIndex, endIndex);

    res.json({
      currentPage: page,
      totalPages: totalPages,
      students: currentPageStudents
    });
  } catch (error) {
    console.error('Error reading student data:', error);
    res.sendStatus(500);
  }
});

// Define a DELETE route to delete a student by ID
app.delete('/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id);

  // Read the existing data from the JSON file
  let existingData = [];
  try {
    const data = fs.readFileSync('students.json');
    existingData = JSON.parse(data);
  } catch (error) {
    console.error('Error reading student data:', error);
    res.sendStatus(500);
  }

  // Find the index of the student with the provided ID
  const index = existingData.findIndex(student => student.studentId === studentId);

  if (index !== -1) {
    // Remove the student from the existing data
    existingData.splice(index, 1);

    // Write the updated data back to the JSON file
    try {
      fs.writeFileSync('students.json', JSON.stringify(existingData, null, 2));
      console.log('Student data deleted successfully!');
      res.sendStatus(200);
    } catch (error) {
      console.error('Error deleting student data:', error);
      res.sendStatus(500);
    }
  } else {
    res.sendStatus(404);
  }
});

// Define a PUT route to update a student by ID
app.put('/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const updatedStudentData = req.body;

  // Read the existing data from the JSON file
  let existingData = [];
  try {
    const data = fs.readFileSync('students.json');
    existingData = JSON.parse(data);
  } catch (error) {
    console.error('Error reading student data:', error);
    res.sendStatus(500);
  }

  // Find the student with the provided ID
  const student = existingData.find(student => student.studentId === studentId);

  if (student) {
    // Update the student data
    Object.assign(student, updatedStudentData);

    // Write the updated data back to the JSON file
    try {
      fs.writeFileSync('students.json', JSON.stringify(existingData, null, 2));
      console.log('Student data updated successfully!');
      res.sendStatus(200);
    } catch (error) {
      console.error('Error updating student data:', error);
      res.sendStatus(500);
    }
  } else {
    res.sendStatus(404);
  }
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