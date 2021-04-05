import React from 'react';

import { BrowserRouter as Link } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

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
        <Card>
          <Card.Body>
            <img className="movie-poster" src={movie.ImagePath} />
            <div className="movie-title">
              <Card.Title className="value">{movie.Title}</Card.Title>
            </div>
            <div className="movie-description">
              <Card.Text className="value">{movie.Description}</Card.Text>
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
                <Button variant="info">Genre Info</Button>
              </Link>
              <Link to={`/directors/${movie.Director.Name}`}>
                <Button variant="info">Director Info</Button>
              </Link>
            </div>
            <div>
              <Card.Footer>
                <Button className="favorites-button" variant="outline-info" size="sm" onClick={() => this.addFavorite(movie)}>
                  Add to Favorites
              </Button>
                <br />
                <Link to={`/`}>
                  <Button className="close-button" variant="outline-info">Back to movies</Button>
                </Link>
              </Card.Footer>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

