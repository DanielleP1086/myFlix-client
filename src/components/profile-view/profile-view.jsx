import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

import axios from 'axios';
import { BrowserRouter as Link } from "react-router-dom";

export class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      birthday: "",
      favoriteMovies: [],
      movies: ""
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token")
    console.log(accessToken);
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
    let user = localStorage.getItem("user");
    axios.delete(`filmx-society.herokuapp.com/users/${username}`, { headers: { Authorization: `Bearer ${token}` } }
    )
      .then(() => {
        alert(user + "has been deleted");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location.pathname = "/";
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { movies } = this.props;
    const { username, password, email, birthday, favoriteMovies } = this.state;

    return (
      <div>
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>User Info</Card.Title>
            <Card.Text>
              Username: {username} <br />
              Email Address: {email} <br />
              Birthday: {birthday}
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
                <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password: </Form.Label>
                <Form.Control type="text" value={password} onChange={e => setPassword(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Email: </Form.Label>
                <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="formBirthday">
                <Form.Label>Birthday: </Form.Label>
                <Form.Control type="date" value={birthday} onChange={e => setBirthday(e.target.value)} />
              </Form.Group>

              {/* <Button variant="info" type="submit" onClick={updateProfile}>Submit Changes</Button> */}
            </Form>
          </Accordion.Collapse>
        </Accordion>

        <div>
          <Button variant="info" onClick={() => this.deleteProfile()}>Delete Account</Button>
        </div>
        <div>
          <h1>Favorite Movies</h1>
          {favoriteMovies.map((movie) => {
            return (
              <div key={movie.id}>
                <Card>
                  <Card.Img variant="top" src={movie.ImagePath} />
                  <Card.Body>
                    <Link to={`/movies/${movie._id}`}>
                      <Card.Title>{movie.Title}</Card.Title>
                    </Link>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}