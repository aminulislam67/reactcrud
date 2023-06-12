import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DisplayStudents = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch student data from API or JSON file
    fetch('/students')
      .then((response) => response.json())
      .then((data) => {
        setStudents(data);
      })
      .catch((error) => {
        console.error('Error fetching student data:', error);
      });
  }, []);

  const handleDeleteStudent = (id) => {
    // Send delete request to API or remove student from JSON file
    fetch(`/students/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        // Remove the deleted student from the list
        setStudents((prevStudents) =>
          prevStudents.filter((student) => student.id !== id)
        );
      })
      .catch((error) => {
        console.error('Error deleting student:', error);
      });
  };

  return (
    <div>
      <h2>Student List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>{student.email}</td>
              <td>
                <Link to={`/students/${student.id}/editstudentpage`}>Edit</Link>
                {/* Add delete button with onClick handler */}
                <button onClick={() => handleDeleteStudent(student.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayStudents;
