import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, useParams } from "react-router-dom";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/esm/Button';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';


export class MainView extends React.Component {
  constructor() {
    super();

    //intialize as null for each state
    this.state = {
      movies: [],
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


  /*onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }*/

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


  onLogoutClick(logout) {
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
          <Navbar.Text>
            Signed in as:
            <Link to={`/users/${Username}`}>
              <Button varient="link">{this.state.username}</Button>
            </Link>
          </Navbar.Text>
        </Navbar>
        <Router>
          <div className="main-view">
            <Route exact path="/" render={() => {
              if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              return movies.map(m => <MovieCard key={m._id} movie={m} />)
            }
            } />
            <Route path="/register" render={() => <RegistrationView />} />
            <Route exact path="/movies/:movieId" render={({ match }) =>
              <MovieView movie={movies.find(m => m._id === match.params.movieID)} />} />
            <Route exact path="/genres/:name" render={({ match }) => {
              if (!movies) return <div className="main-view" />;
              return <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} />
            }
            } />
            <Route exact path="/directors/:name" render={({ match }) => {
              if (!movies) return <div className="main-view" />;
              return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} />
            }
            } />
            <Route exact path="/users/:Username" render={() => {
              if (!user)
                return <ProfileView onLoggedIn={user => this.onLoggedIn(user)} />
            }
            } />
          </div>
        </Router>
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
        <Button onLogoutClick={logout => this.onLogoutClick}>Log Out</Button>
      </div>
    );
  }
}