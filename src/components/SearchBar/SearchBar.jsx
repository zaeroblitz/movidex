import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { RiSearchLine } from 'react-icons/ri';
import { searchMovie } from '../../features/currentGenreOrCategory';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [debounce, setDebounce] = useState(query);
  const dispatch = useDispatch();

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebounce(query);
    }, 800);

    return () => {
      clearTimeout(timerId);
    };
  }, [query]);

  useEffect(() => {
    if (debounce) {
      dispatch(searchMovie(debounce));
    }
  }, [debounce]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      dispatch(searchMovie(query));
    }
  };

  return (
    <div className="relative w-[220px] sm:w-[350px]">
      <RiSearchLine className="absolute top-1/2 -translate-y-1/2 ml-3 text-xl text-[#DDDDDD]" />
      <input
        type="text"
        onKeyDown={(event) => handleKeyDown(event)}
        onChange={(event) => setQuery(event.target.value)}
        className="w-full rounded-2xl pl-10 px-6 py-3 border-2 border-[#DDDDDD] focus:outline-[#F6F6F6] focus:outline-offset-2 text-slate-500"
        placeholder="Search movie..."
      />
    </div>
  );
};

export default SearchBar;
