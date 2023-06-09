import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

const AddStudentPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [admissionYear, setAdmissionYear] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process the student information here or make an API request

    // Clear the form fields after submission
    setFirstName('');
    setLastName('');
    setStudentId('');
    setEmail('');
    setDateOfBirth('');
    setAdmissionYear('');
  };

  return (
    <Container>
      <h2>Add Student Information</h2>
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
        <br />
        <Button variant="primary" type="submit">
          Add Student
        </Button>
      </Form>
    </Container>
  );
};

export default AddStudentPage;
