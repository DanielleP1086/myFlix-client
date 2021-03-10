import React from 'react';
import { PropTypes } from 'prop-types';

import { BrowserRouter as Router, Route, useParams, Link } from "react-router-dom";

import Button from 'react-bootstrap/Button';

import './movie-view.scss'
import axios from 'axios';




export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  addFavorite(movie) {
    let token = localStorage.getItem("token");
    let url =
      `https://filmx-society.herokuapp.com/users/` +
      localStorage.getItem("user") +
      "/movies/" +
      movie._id;

    axios.post(url, "", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        window.open("/users/" + localStorage.getItem("user"), "_self");
        alert("Added to favorites!");
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  render() {
    const { movie } = this.props;

    if (!movie) return null;

    return (
      <div className="movie-view">
        <img className="movie-poster" src={movie.ImagePath} />
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>

        <div className="movie-genre">
          <span className="label">Genre: </span>
          <span className="value">{movie.Genre.Name}</span>
        </div>
        <div className="movie-director">
          <span className="label">Director: </span>
          <span className="value">{movie.Director.Name}</span>
        </div>
        <div>
          <Link to={`/genres/${movie.Genre.Name}`}>
            <Button variant="info">Genre</Button>
          </Link>
          <Link to={`/directors/${movie.Director.Name}`}>
            <Button variant="info">Director</Button>
          </Link>
        </div>
        <br />
        <Link to={`/`}>
          <Button variant="info">Close</Button>
        </Link>
        <div>
          <Button variant="primary" size="sm" onClick={() => this.addFavorite(movie)}>
            Add to Favorites
          </Button>
        </div>
      </div>
    );
  }
}

/*MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    Description: PropTypes.string,
    ImagePath: PropTypes.string,
    Genre: PropTypes.shape({
      Name: PropTypes.string
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string
    }),
    onClick: PropTypes.func
  }).isRequired
};
*/