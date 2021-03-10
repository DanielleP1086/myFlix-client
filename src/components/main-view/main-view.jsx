import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, useParams, Link } from "react-router-dom";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/esm/Button';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';

import './main-view.scss';
import { Container } from 'react-bootstrap';


export class MainView extends React.Component {
  constructor() {
    super();

    //intialize as null for each state
    this.state = {
      movies: [],
      selectedMovie: "",
      user: null
    };
  }

  componentDidMount() {
    //persist login data
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios.get('https://filmx-society.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` } //take out automatic spacing
    })
      .then(response => {
        //assign result to state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });
    //save authorization data (user + token) locally
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }


  /*  onLogoutClick(logout) {
     localStorage.removeItem('token');
     localStorage.removeItem('user');
   }
 
   /* setInititalState() {
      this.setState({
        selectedMovie: null
      });
    }*/

  render() {
    const { movies, user } = this.state;


    //before the movies have been loaded
    if (!movies) return <div className="main-view" />;

    return (
      <div className="main-view">
        <Router>
          <Container>
            <Navbar bg="light" className="sticky-nav">
              <Navbar.Brand className="web-title">
                <img
                  src={require("./logo.svg")}
                  width="50"
                  height="50"
                  className="d-inline-block align-top"
                  alt="Film Society"
                />{' '}
            Film Society
            </Navbar.Brand>
              <Navbar.Text className="signinText">
                <Link to={`/users/${user}`}>
                  <Button variant="link">My Account</Button>
                </Link>
              </Navbar.Text>
              <Navbar>
                <Link to={`/`}>
                  <Button variant="link">Home</Button>
                </Link>
              </Navbar>
            </Navbar>
          </Container>
          <div className="main-view">
            <Route exact path="/" render={() => {
              if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
              return movies.map(m =>
                <Row className="justify-content-md-center">
                  <Col md={4}>
                    <MovieCard key={m._id} movie={m}
                    />
                  </Col>
                </Row>)

            }
            } />
            <Route path="/register" render={() => <RegistrationView />} />
            <Route path="/movies/:movieId" render={({ match }) => (
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} />
            )}
            />

            <Route path="/genres/:name" render={({ match }) => {
              if (!movies) return <div className="main-view" />;
              return <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} />
            }
            } />
            <Route path="/directors/:name" render={({ match }) => {
              if (!movies) return <div className="main-view" />;
              return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} />
            }
            } />
            <Route exact path="/users/:Username" render={() =>
              <ProfileView movies={movies} />
            } />
          </div>
        </Router>
      </div>
    );
  }
}