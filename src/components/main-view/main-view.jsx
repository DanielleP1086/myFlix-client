import React from 'react';
import axios from 'axios';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
  constructor() {
    super();

    //intialize state as an empty object
    this.state = {
      movies: null,
      selectedMovie: null
    };
  }

  componentDidMount() {
    axios.get('https://filmx-society.herokuapp.com/movies')
      .then(response => {
        //assign result to state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;

    //before the movies have been loaded
    if (!movies) return <div className="main-view" />;

    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} />

          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick
              (movie)} />
          ))
        }
      </div>
    );
  }
}