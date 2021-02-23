import React from 'react';
import { PropTypes } from 'prop-types';

import Button from 'react-bootstrap/Button';

import './movie-view.scss'




export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }


  refreshPage() {
    window.open('/movies', '_self');
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
        <Button onClick={this.refreshPage} variant="info" className='card-button'>Close</Button>
      </div>
    )
  }
}

MovieView.propTypes = {
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