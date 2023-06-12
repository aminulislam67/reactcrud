import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

const AddStudentPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [admissionYear, setAdmissionYear] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const studentData = {
      firstName,
      lastName,
      studentId,
      email,
      dateOfBirth,
      admissionYear,
    };

    try {
      const response = await fetch('http://localhost:5000/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });

      if (response.ok) {
        console.log('Student data saved successfully!');
        // Clear the form fields after successful submission
        setFirstName('');
        setLastName('');
        setStudentId('');
        setEmail('');
        setDateOfBirth('');
        setAdmissionYear('');
      } else {
        console.error('Failed to save student data');
      }
    } catch (error) {
      console.error('Error saving student data:', error);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-80">
      <div
        className="p-4"
        style={{
          width: '400px',
          marginTop: '50px',
          boxShadow: '0 8px 40px -8px rgba(0, 191, 255, 0.8)',
        }}
      >
        <h2 className="text-center">Add Student Information</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="firstName">
            <Form.Label>First Name:</Form.Label>
            <Form.Control
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="lastName">
            <Form.Label>Last Name:</Form.Label>
            <Form.Control
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="studentId">
            <Form.Label>Student ID:</Form.Label>
            <Form.Control
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="dateOfBirth">
            <Form.Label>Date of Birth:</Form.Label>
            <Form.Control
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="admissionYear">
            <Form.Label>Admission Year:</Form.Label>
            <Form.Control
              type="text"
              value={admissionYear}
              onChange={(e) => setAdmissionYear(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Add Student
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default AddStudentPage;
