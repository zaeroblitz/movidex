import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GridLoader } from 'react-spinners';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import { useGetMoviesQuery } from '../../services/TMDB';
import MovieList from '../MovieList/MovieList';
import { setNextPage, setPrevPage } from '../../features/currentGenreOrCategory';

const Movies = () => {
  const dispatch = useDispatch();
  const { genreIdOrCategoryName, searchQuery, page } = useSelector((state) => state.currentGenreOrCategory);
  const { data, error, isFetching } = useGetMoviesQuery({ genreIdOrCategoryName, page, searchQuery });

  const handlePrevPage = () => {
    if (page !== 1) {
      dispatch(setPrevPage());
    }
  };

  const handleNextPage = () => {
    if (page !== data.total_pages) {
      dispatch(setNextPage(data.total_pages));
    }
  };

  if (isFetching) {
    return (
      <div className="flex justify-center items-center mt-12">
        <GridLoader color="#707A85" size={24} />
      </div>
    );
  }

  if (!data.results.length) {
    return (
      <div className="flex justify-center mt-12">
        <p>
          No movies match that name.
          <br />
          Please search for something else.
        </p>

      </div>
    );
  }

  if (error) return 'An error has occured';

  return (
    <div className="mb-20">
      <MovieList movies={data} />
      <div className="flex justify-center items-center text-xl gap-6 mt-10 text-zinc-700">
        <FaChevronLeft className="cursor-pointer" onClick={() => handlePrevPage()} />
        {page}
        <FaChevronRight className="cursor-pointer" onClick={() => handleNextPage()} />
      </div>
    </div>
  );
};

export default Movies;
