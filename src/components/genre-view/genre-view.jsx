import React from 'react';

import Button from 'react-bootstrap/Button';

//import './genre-view.scss'




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
      <div className="movie-genre">
        <span className="label">Genre: </span>
        <span className="value">{movie.Genre.Name}</span>
        <Button onClick={this.refreshPage} variant="info" className='view-button'>Close</Button>
      </div>
    )
  }
}

