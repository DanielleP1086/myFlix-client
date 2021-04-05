import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import axios from 'axios';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    //send a request to the server for authentication
    axios.post('https://filmx-society.herokuapp.com/login', {
      Username: username,
      Password: password
    })
      //after the request has been made if there's a match props will be called with username and token
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        alert('no such user')
      });
  };


  return (
    <Form>
      <Form.Group controlId="formUsername">
        <Form.Label>Username: </Form.Label>
        <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password: </Form.Label>
        <Form.Control type="text" value={password} onChange={e => setPassword(e.target.value)} />
      </Form.Group>

      <Button variant="info" type="submit" onClick={handleSubmit}>Submit</Button>
      <br />
      <br />
      <br />
      <div>
        <p>No account? Register here!</p>
        <Router>
          <Link to={`/register`}>
            <Button variant="info">Register</Button>
          </Link>
        </Router>
      </div>
    </Form>


  );
}

