import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

import axios from 'axios';
import { BrowserRouter as Link } from "react-router-dom";

import './profile-view.scss';

export class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      birthday: "",
      favoriteMovies: [],
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token")
    if (accessToken !== null) {
      this.getUser(accessToken);
    }

  }

  formatDate(date) {
    if (date) date = date.substring(0, 10);
    return date;
  }

  getUser(token) {
    const username = localStorage.getItem("user")
    axios.get(`https://filmx-society.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        this.setState({
          username: response.data.Username,
          password: response.data.Password,
          email: response.data.Email,
          birthday: response.data.Birthday,
          favoriteMovies: response.data.FavoriteMovies
        });
      });
  }

  updateProfile(e, username, password, email) {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    axios({
      method: 'put',
      url: `https://filmx-society.herokuapp.com/users/${user}`,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        Username: username,
        Password: password,
        Email: email
      }
    })
      .then((res) => {
        const data = res.data;

        localStorage.setItem('user', data.Username);
        console.log('Profile updated');
        window.open(`/users/${username}`, '_self');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  setUsername(input) {
    this.username = input;
  }

  setPassword(input) {
    this.password = input;
  }

  setEmail(input) {
    this.email = input;
  }



  removeMovie(movie) {
    let token = localStorage.getItem("token");
    let url =
      `https://filmx-society.herokuapp.com/users/` +
      localStorage.getItem("user") +
      "/movies/" +
      movie._id;

    axios.delete(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        alert("Deleted favorite!");
        this.componentDidMount();
      });
  }


  deleteProfile() {

    let token = localStorage.getItem("token");
    let username = localStorage.getItem("user");

    axios.delete(`https://filmx-society.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` }
    })

      .then(res => {
        alert('Are you sure you want to delete?')
      })
      .then(res => {
        alert('Account successfully deleted')
      })
      .then(res => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");

        this.setState({
          user: null
        });
        window.open('/', 'self');
      })
      .catch(e => {
        alert('Account could not be deleted')
      });
  }

  render() {
    const { movies } = this.props;
    const { username, password, email, favoriteMovies } = this.state;

    return (
      <div className="profile-view">
        <Card style={{ width: '100%' }}>
          <Card.Body>
            <Card.Title>User Info</Card.Title>
            <Card.Text>
              Username: {username} <br />
              Email Address: {email} <br />
            </Card.Text>
          </Card.Body>
        </Card>

        <Accordion defaultActiveKey="0">
          <Accordion.Toggle as={Button} variant="info" eventKey="1">
            Update Info
        </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Form>

              <Form.Group controlId="formUsername">
                <Form.Label>Username: </Form.Label>
                <Form.Control type="text" onChange={e => this.setUsername(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password: </Form.Label>
                <Form.Control type="password" onChange={e => this.setPassword(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Email: </Form.Label>
                <Form.Control type="email" onChange={e => this.setEmail(e.target.value)} />
              </Form.Group>

              <Button variant="info" type="submit" onClick={(e) => this.updateProfile(e, this.username, this.password, this.email)}>Submit Changes</Button>
            </Form>
          </Accordion.Collapse>
        </Accordion>
        <br />
        <br />
        <div>
          <h1>Favorite Movies</h1>
          {favoriteMovies &&
            movies.map(
              (movie) => {
                if (favoriteMovies.find((favMovie) => favMovie === movie._id)) {
                  return (
                    <div key={movie._id}>
                      <Card>
                        <img className="favorite-poster" src={movie.ImagePath} />
                        <Card.Body className="favorite-card">
                          <Link to={`/movies/${movie._id}`}>
                            <Card.Title>{movie.Title}</Card.Title>
                          </Link>
                          <Button
                            variant="info"
                            onClick={() => this.removeMovie(movie)}>Remove Favorite</Button>
                        </Card.Body>
                      </Card>
                    </div>
                  );
                }
              }
            )
          }
        </div>
        <br />
        <br />
        <div>
          <Button variant="info" onClick={() => this.deleteProfile()}>Delete Account</Button>
        </div>
      </div>
    );
  }
}