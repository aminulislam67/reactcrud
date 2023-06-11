import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process the login data here or make an API request

    // Clear the form fields after submission
    setUsername('');
    setPassword('');
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-90">

<div
    className="p-4"
    style={{
      width: '400px',
      marginTop: '100px',
      boxShadow: '0 8px 40px -8px rgba(0, 191, 255, 0.8)',
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