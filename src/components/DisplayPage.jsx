import React, { useState, useEffect } from 'react';
import { Table, Button, Form } from 'react-bootstrap';

const DisplayPage = () => {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [editStudentId, setEditStudentId] = useState(null);
  const [editedStudent, setEditedStudent] = useState({
    studentId: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    admissionYear: '',
  });

  useEffect(() => {
    fetchStudents();
  }, [currentPage]);

  const fetchStudents = async () => {
    try {
      const response = await fetch(`http://localhost:5000/students?page=${currentPage}`);
      const data = await response.json();
      setStudents(data.students);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  useEffect(() => {
    filterStudents();
  }, [students]);

  const filterStudents = () => {
    if (searchValue.trim() === '') {
      setFilteredStudents(students);
    } else {
      const filtered = students.filter(
        (student) => student.studentId.toString().includes(searchValue.trim())
      );
      setFilteredStudents(filtered);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    filterStudents();
  };

  const handleEdit = (studentId) => {
    const student = students.find((student) => student.studentId === studentId);
    if (student) {
      setEditStudentId(studentId);
      setEditedStudent(student);
    }
  };

  const handleCancelEdit = () => {
    setEditStudentId(null);
    setEditedStudent({
      studentId: '',
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      email: '',
      admissionYear: '',
    });
  };

  const handleSave = (studentId) => {
    const updatedStudent = {
      studentId: studentId,
      firstName: editedStudent.firstName,
      lastName: editedStudent.lastName,
      dateOfBirth: editedStudent.dateOfBirth,
      email: editedStudent.email,
      admissionYear: editedStudent.admissionYear,
    };

    fetch(`http://localhost:5000/students/${studentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedStudent),
    })
      .then((response) => {
        if (response.ok) {
          handleCancelEdit();
          fetchStudents();
        } else {
          console.error('Error updating student:', response.status);
        }
      })
      .catch((error) => console.error('Error updating student:', error));
  };

  const handleDelete = (studentId) => {
    fetch(`http://localhost:5000/students/${studentId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          fetchStudents();
        } else {
          console.error('Error deleting student:', response.status);
        }
      })
      .catch((error) => console.error('Error deleting student:', error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedStudent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>Student List</h2>

      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search by Student ID"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Button variant="primary" className="mt-2" onClick={handleSearch}>
          Search
        </Button>
      </Form.Group>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Birth</th>
            <th>Email</th>
            <th>Admission Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student.studentId}>
              {editStudentId === student.studentId ? (
                <>
                  <td>{student.studentId}</td>
                  <td>
                    <input
                      type="text"
                      name="firstName"
                      value={editedStudent.firstName}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="lastName"
                      value={editedStudent.lastName}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="dateOfBirth"
                      value={editedStudent.dateOfBirth}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="email"
                      value={editedStudent.email}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="admissionYear"
                      value={editedStudent.admissionYear}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <Button
                      variant="success"
                      className="me-2"
                      onClick={() => handleSave(student.studentId)}
                    >
                      Save
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => handleCancelEdit()}
                    >
                      Cancel
                    </Button>
                  </td>
                </>
              ) : (
                <>
                  <td>{student.studentId}</td>
                  <td>{student.firstName}</td>
                  <td>{student.lastName}</td>
                  <td>{student.dateOfBirth}</td>
                  <td>{student.email}</td>
                  <td>{student.admissionYear}</td>
                  <td>
                    <Button
                      variant="info"
                      className="me-2"
                      onClick={() => handleEdit(student.studentId)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(student.studentId)}
                    >
                      Delete
                    </Button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </Table>

      <Button
        variant="primary"
        disabled={currentPage === 1}
        onClick={handlePreviousPage}
      >
        Previous
      </Button>
      <Button
        variant="primary"
        disabled={currentPage === totalPages}
        onClick={handleNextPage}
      >
        Next
      </Button>
    </div>
  );
};

export default DisplayPage;