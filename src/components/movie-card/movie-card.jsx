import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from "react-router-dom";

import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <Card
        style={{ width: '200', height: 'auto' }}
        className='card'
      >
        <Card.Img
          variant="top"
          src={movie.ImagePath}
        />
        <Card.Body>
          <Card.Title className='card-title'>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="info" className='card-button'>More Info</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    Description: PropTypes.string,
    ImagePath: PropTypes.string
  }).isRequired
};
