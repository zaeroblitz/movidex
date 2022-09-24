import React from 'react';
import { Link } from 'react-router-dom';
import { Grow, Rating } from '@mui/material';

const Movie = ({ movie, i }) => (
  <div className="relative rounded-2xl text-center min-h-[300px] max-h-[600px] hover:scale-105 duration-500">
    <Grow in key={i} timeout={(i + 1) * 250}>
      <Link to={`/movie/${movie.id}`} className="hover: cursor-pointer">
        <div className="absolute w-full h-full overflow-hidden rounded-2xl mb-5  duration-500">
          <div className="absolute bg-gradient-to-b from-transparent to-black opacity-95 z-2 w-full h-[300px]" />
          <img
            src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : 'https://www.fillmurray.com/200/300'}
            alt={movie.title}
            className="w-full h-[300px] rounded-2xl object-cover bg-cover bg-center hover:scale-105 duration-500 z-1"
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 mb-5 mx-2 z-3">
          <h5 className="text-center whitespace-nowrap text-ellipsis overflow-hidden text-white font-bold">{movie.title}</h5>
          <Rating readOnly value={(movie.vote_average / 2)} precision={0.1} />
        </div>
      </Link>
    </Grow>
  </div>
);

export default Movie;
