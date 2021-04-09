import React from 'react';
import { connect } from 'react-redux';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';

import { MovieCard } from '../movie-card/movie-card';

import { Col, Row } from 'react-bootstrap';
// import './movies-list.scss';

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter((m) => m.Title.toLocaleLowerCase().includes(visibilityFilter.toLocaleLowerCase()));
  }

  if (!movies) return <div className="main-view" />;

  return (
    <Row>
      <VisibilityFilterInput className="search-box" variant='outline-light' visibilityFilter={visibilityFilter} />
      {filteredMovies.map((m, index) => (
        <Col key={index} md='4' sm='6' xs='12'>
          <MovieCard key={m._id} movie={m} />
        </Col>
      ))}
    </Row>

  );
}

export default connect(mapStateToProps)(MoviesList);