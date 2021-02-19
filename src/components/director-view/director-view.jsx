import React from 'react';
//import { PropTypes } from 'prop-types';

//import { Link } from "react-router-dom";

import Button from 'react-bootstrap/Button';

//import './director-view.scss'




export class DirectorView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }


  //is this the correct function to return to the original movie?
  refreshPage() {
    window.location.reload(false);
  }

  render() {
    const { movie } = this.props;

    if (!movie) return null;

    return (
      <div className="movie-director">
        <span className="label">Director: </span>
        <span className="value">{movie.Director.Name}</span>
        <Button onClick={this.refreshPage} variant="info" className='view-button'>Close</Button>
      </div>
    )
  }
}

