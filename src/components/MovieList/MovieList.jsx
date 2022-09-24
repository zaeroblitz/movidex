import React from 'react';
import Movie from '../Movie/Movie';

const MovieList = ({ movies, itemLimit = 20 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
    {movies.results.slice(0, itemLimit).map((movie, i) => (
      <Movie key={i} movie={movie} i={i} />
    ))}
  </div>
);

export default MovieList;
