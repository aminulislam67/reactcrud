import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      username,
      password,
    };

    try {
      // Make a POST request to the server to process the login data
      await axios.post('/api/login', userData);
      // Clear the form fields after successful submission
      setUsername('');
      setPassword('');
      // Redirect to the dashboard or desired destination
      navigate('/AddStudentPage');
    } catch (error) {
      console.error(error);
      // Handle error during login submission
      // Display an error message or perform any other necessary actions
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-90">
      <div
        className="p-4"
        style={{
          width: '400px',
          marginTop: '100px',
          boxShadow: '0 8px px -8px rgba(0, 191, 255, 0.8)',
        }}
      >
        <h2 className="text-center">Login</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="username">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Login
          </Button>
        </Form>
        <p className="text-center mt-3">
          Don't have an account? <Link to="/">Register</Link>
        </p>
      </div>
    </Container>
  );
};

export default Login;
