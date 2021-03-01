import React from 'react';
//import { PropTypes } from 'prop-types';

//import { Link } from "react-router-dom";

import Button from 'react-bootstrap/Button';

import { BrowserRouter as Router, Route, useParams, Link } from "react-router-dom";


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
    const { director } = this.props;
    console.log(director);

    if (!director) return null;

    return (
      <div className="movie-director">
        <div>
          <span className="label">Director: </span>
          {/* <span className="value">{movie.Genre.Name}</span> */}
        </div>
        <div>
          <span className="label">Bio: </span>
        </div>
        <div>
          <span className="label">Birthday: </span>
        </div>
        <Link to={`/`}>
          <Button variant="info">Close</Button>
        </Link>
      </div>
    )
  }
}

