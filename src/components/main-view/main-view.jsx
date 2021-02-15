import React from 'react';
import axios from 'axios';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';

//import { React Component as Logo } from './logo.svg'


import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
  constructor() {
    super();

    //intialize as null for each state
    this.state = {
      movies: null,
      selectedMovie: null,
      user: null,
      newUser: null
    };
  }

  //check syntax for this and add a consol
  componentDidMount() {
    axios.get('https://filmx-society.herokuapp.com/movies')
      .then((response) => {
        //assign result to state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //compare bottom two 
  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  onLoggedIn(user) {
    this.setState({
      user
    });
    console.log('user: ' + this.state.user);
  }

  onRegister(newUser) {
    this.setState({
      newUser
    });
  }

  setInititalState() {
    this.setState({
      selectedMovie: null
    });
  }

  render() {
    const { movies, selectedMovie, user } = this.state;

    if (!user)
      return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;

    /* if (!newUser) return (
       <RegistrationView onRegister={(newUser) => this.onRegister(newUser)} />
     );*/

    //before the movies have been loaded
    if (!movies) return <div className="main-view" />;

    return (
      <div className="main-view">
        <Navbar bg="dark">
          <Navbar.Brand href="#home">
            <img
              src="/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="Film Society"
            />
          </Navbar.Brand>
        </Navbar>
        {selectedMovie
          ? (
            <Row className="justify-content-md-center">
              <Col md={2}>
                <MovieView
                  movie={selectedMovie}
                  onBackClick={movie => this.onMovieClick(null)}
                />
              </Col>
            </Row>
          )
          : (
            <Row className="justify-content-md-center">
              {movies.map((movie) => (
                <Col md={4}>
                  <MovieCard
                    key={movie._id}
                    movie={movie}
                    onClick={movie => this.onMovieClick(movie)}
                  />
                </Col>
              ))}
            </Row>
          )
        }
      </div>
    );
  }
}