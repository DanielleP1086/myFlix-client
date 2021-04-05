import React from 'react';


import { Card, Button, Container } from 'react-bootstrap';

import { BrowserRouter as Link } from "react-router-dom";


//import './genre-view.scss'




export class GenreView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { genre } = this.props;

    if (!genre) return null;

    return (
      <div className="movie-genre">
        <Container>
          <Card>
            <Card.Body>
              <Card.Title className="label">{genre.Name}</Card.Title>
              <Card.Text className="label">{genre.Description}</Card.Text>
            </Card.Body>
          </Card>
          <Card.Footer>
            <Link to={`/`}>
              <Button variant="info">Close</Button>
            </Link>
          </Card.Footer>
        </Container>
      </div>
    )
  }
}

