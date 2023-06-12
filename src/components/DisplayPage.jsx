import React from 'react';
import { Table, Button } from 'react-bootstrap';

const DisplayPage = ({ students, onDeleteStudent }) => {
  return (
    <div className="container mt-4">
      <h2 className="text-center">Student Information</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Student ID</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>Admission Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.studentId}>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>{student.studentId}</td>
              <td>{student.email}</td>
              <td>{student.dateOfBirth}</td>
              <td>{student.admissionYear}</td>
              <td>
                <Button variant="info" className="me-2">Edit</Button>
                <Button variant="danger" onClick={() => onDeleteStudent(student)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DisplayPage;
