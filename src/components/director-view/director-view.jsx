import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import { BrowserRouter as Link } from "react-router-dom";
import moviesApp from '../../reducers/reducers';
import { MovieCard } from '../movie-card/movie-card';






export class DirectorView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }



  render() {
    const { director, movies } = this.props;

    if (!director) return null;

    return (
      <div className="movie-director">
        <Container>
          <Card>
            <Card.Body>
              <Card.Title className="value">{director.Name}</Card.Title>
              <Card.Text className="value">{director.Bio}</Card.Text>
              <Card.Text className="value">Birthday: {director.Birth}</Card.Text>
            </Card.Body>
          </Card>
          <Card.Footer>
            <Link to={`/`}>
              <Button variant="info">Close</Button>
            </Link>
          </Card.Footer>
        </Container>
      </div >
    )
  }
}

