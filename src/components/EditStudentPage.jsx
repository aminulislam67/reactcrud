import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

const EditStudentPage = () => {
  const { id } = useParams();
  const history = useHistory();

  const [student, setStudent] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  useEffect(() => {
    // Fetch student data from API or JSON file based on the ID
    fetch(`/students/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setStudent(data);
      })
      .catch((error) => {
        console.error('Error fetching student data:', error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send updated student data to API or update JSON file
    fetch(`/students/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(student),
    })
      .then(() => {
        // Redirect to display page after successful update
        history.push('/display');
      })
      .catch((error) => {
        console.error('Error updating student data:', error);
      });
  };

  return (
    <div>
      <h2>Edit Student Information</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={student.firstName}
            onChange={handleChange}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={student.lastName}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={student.email}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditStudentPage;
