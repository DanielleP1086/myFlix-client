import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';


import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import { setMovies } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';

import { Container } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import './main-view.scss';


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
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        //assign result to state
        this.props.setMovies(response.data
        );
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
    this.setState({
      user: authData.user.Username
    });
    //save authorization data (user + token) locally
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }



  onLogout() {
    this.setState(state => ({
      user: null
    }));
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.open('/', '_self');
  }

  render() {
    let { movies } = this.props;
    let { user } = this.state;


    return (
      <div className="main-view">
        <Router>
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

            {!user ? (
              <Container>
                <Link to={`/`}>
                  <Button variant="link">Sign In</Button>
                </Link>
                <Link to={`/register`}>
                  <Button variant="link">Register!</Button>
                </Link>
              </Container>
            ) : (
                <Container>
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
                  <Navbar>
                    <Button variant="link" type="submit" onClick={this.onLogout.bind(this)}>Logout</Button>
                  </Navbar>
                </Container>
              )}
          </Navbar>
          <br />

          <br />
          <Switch>
            <Route exact path={['/', '/login']} render={() => {
              if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
              return <MoviesList movies={movies} />;
            }} />
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
          </Switch>
        </Router>
      </div >
    );
  }
}

let mapStateToProps = state => {
  return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies })(MainView);