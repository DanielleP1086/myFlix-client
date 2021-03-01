import React from 'react';

import Button from 'react-bootstrap/Button';

import { BrowserRouter as Router, Route, useParams, Link } from "react-router-dom";


//import './genre-view.scss'




export class GenreView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { genre } = this.props;
    console.log(genre);

    if (!genre) return null;

    return (
      <div className="movie-genre">
        <div>
          <span className="label">Genre: </span>
          {/* <span className="value">{movie.Genre.Name}</span> */}
        </div>
        <div>
          <span className="label">Genre Description: </span>
        </div>
        <Link to={`/`}>
          <Button variant="info">Close</Button>
        </Link>
      </div>
    )
  }
}

