/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { GridLoader } from 'react-spinners';
import { useDispatch } from 'react-redux';
import { Link, useParams, useLocation } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';
import { GoLinkExternal } from 'react-icons/go';
import { RiMovie2Line } from 'react-icons/ri';
import { FiPlayCircle } from 'react-icons/fi';

import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';
import { useGetMovieQuery, useGetMovieRecommendationsQuery } from '../../services/TMDB';
import MovieList from '../MovieList/MovieList';

const MovieInformation = () => {
  const [trailerOpen, setTrailerOpen] = useState(false);
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const { data, isFetching, isError } = useGetMovieQuery(id);
  const { data: recommendations } = useGetMovieRecommendationsQuery(id);

  useEffect(() => {
    setTrailerOpen(false);
  }, [location]);

  if (isFetching) {
    return (
      <div className="flex justify-center items-center">
        <GridLoader size={24} color="#DDDDDD" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center">
        <Link to="/">Something went wrong - Click here to go back</Link>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen mb-[100px]">
      {/* Backdrop */}
      <section className="w-full md:h-[480px] relative rounded-2xl">
        {trailerOpen && data.videos.results.length && (
          <iframe
            autoPlay
            title="Trailer"
            src={`https://youtube.com/embed/${data.videos.results[0].key}?autoplay=1`}
            className="absolute w-full h-full z-10 rounded-2xl"
            allow="autoplay"
          />
        )}

        {/* Gradient Backdrop */}
        <div className={`absolute w-full h-full rounded-2xl bg-gradient-to-b from-transparent to-black opacity-100 ${trailerOpen ? 'z-0' : 'z-20'}`} />

        {/* Tagline */}
        <div className={`absolute z-1 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${trailerOpen ? 'z-0' : 'z-30'}`}>
          <h1 className="text-xl text-gray-200 text-center font-light">{data?.tagline}</h1>
        </div>

        {/* Links */}
        <div className={`absolute flex items-center gap-2 z-20 left-6 duration-500 text-gray-200
        ${trailerOpen ? '-bottom-14' : 'bottom-6'}`}
        >
          <a
            href={data?.homepage}
            rel="noopener noreferrer"
            target="_blank"
            className={`flex items-center px-4 py-2 rounded-full border
            hover:-translate-y-2 hover:cursor-pointer duration-500
            ${trailerOpen ? 'bg-zinc-700' : 'border-gray-200'}`}
          >
            <GoLinkExternal />
            <p className="ml-2">Website</p>
          </a>

          <a
            href={`https://www.imdb.com/title/${data?.imdb_id}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center px-4 py-2 rounded-full border
            hover:-translate-y-2 hover:cursor-pointer duration-500
            ${trailerOpen ? 'bg-zinc-700' : 'border-gray-200'}`}
          >
            <RiMovie2Line />
            <p className="ml-2">IMDB</p>
          </a>

          <div
            onClick={() => setTrailerOpen(!trailerOpen)}
            className={`flex items-center px-4 py-2 rounded-full border
            hover:-translate-y-2 hover:cursor-pointer duration-500
            ${trailerOpen ? 'bg-zinc-700' : 'border-gray-200'}`}
          >
            <FiPlayCircle />
            <p className="ml-2">Trailer</p>
          </div>
        </div>

        {/* Backdrop Image */}
        <img
          src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
          className="w-full h-full object-cover bg-cover bg-center bg-no-repeat rounded-2xl"
          alt="Movie Backdrop"
        />
      </section>

      {/* Movie Details */}
      <section className={`w-full px-0 md:px-6 grid grid-cols-12 duration-500 ${trailerOpen ? 'mt-24' : 'mt-10'}`}>
        {/* Movie Poster */}
        <div className="col-span-2 md:hidden" />
        <img
          src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
          className="col-span-8 md:col-span-4 object-cover bg-cover bg-center bg-no-repeat rounded-2xl"
          alt="Movie Backdrop"
        />
        <div className="col-span-2 md:hidden" />

        <div className="col-span-12 md:col-span-8 flex flex-col relative ml-5">
          {/* Movie Title */}
          <h1 className="text-xl md:text-3xl lg:text-4xl font-extrabold text-slate-800 text-ellipsis overflow-hidden">
            {data?.title}
          </h1>

          {/* Movie Rating */}
          <div className="flex items-center my-4">
            <div className="px-2 py-2 bg-yellow-400 rounded-full">
              <AiFillStar size={36} color="white" />
            </div>
            <p className="ml-4 text-2xl text-slate-800">{data?.vote_average}</p>
            <p className="ml-2 text-sm text-gray-400">{data?.vote_count} reviewed</p>
          </div>

          {/* Movie Genres */}
          <div className="flex flex-wrap gap-2 items-center">
            {data?.genres.map((genre) => (
              <Link
                key={genre?.id}
                to="/"
                onClick={() => dispatch(selectGenreOrCategory(genre?.id))}
                className="bg-gray-200 px-4 py-2 rounded-full hover:cursor-pointer hover:shadow-md duration-500"
              >
                <p>{genre?.name}</p>
              </Link>
            ))}
          </div>

          {/* Movie Duration & Language */}
          <div className="mt-4 text-slate-600">
            <p>{data.runtime} min / {data?.spoken_languages.length > 0 ? data.spoken_languages[0].english_name : ''}</p>
          </div>

          {/* Movie Overview */}
          <div className="w-[95%] mt-4">
            <h4 className="text-slate-600 text-md font-semibold mb-2">Overview</h4>
            <p className="text-gray-400">{data.overview}</p>
          </div>

          {/* Top Cast */}
          <div className="mt-4 w-full">
            <h4 className="text-slate-600 text-md font-semibold mb-2">Top Cast</h4>
            <div className="grid grid-cols-12 gap-3">
              {data?.credits?.cast.map((cast) => (
                cast.profile_path && (
                <div key={cast?.id} className="col-span-4 sm:col-span-3 lg:col-span-2">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${cast?.profile_path}`}
                    alt={cast?.name}
                    className="w-full rounded-lg object-cover bg-cover bg-center bg-no-repeat mb-2"
                  />
                  <p className="text-sm text-gray-400">{cast?.name}</p>
                </div>
                )
              )).slice(0, 6)}
            </div>
          </div>
        </div>
      </section>

      {/* Movie Recommendations */}
      <section className="w-full px-0 md:px-6 mt-10">
        <h2 className="text-bold text-2xl text-slate-700 text-center font-bold mb-4">You might also like</h2>
        {recommendations
          ? (
            <MovieList
              movies={recommendations}
              itemLimit={15}
            />
          )
          : <p className="text-center text-xl text-slate-700">Sorry, no found</p>}
      </section>
    </div>
  );
};

export default MovieInformation;
