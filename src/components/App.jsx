import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Actors, MovieInformation, Movies, Navbar, Profile, Sidebar } from '.';
import { useStateContext } from '../context/ContextProvider';
import { resetPage } from '../features/currentGenreOrCategory';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { genreIdOrCategoryName, searchQuery } = useSelector((state) => state.currentGenreOrCategory);
  const { activeMenu, setActiveMenu, screenSize, setScreenSize } = useStateContext();

  //* Handle menu icon when resize
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  //* Hide menu icon when width <= 1024
  useEffect(() => {
    if (screenSize <= 1024) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  //* Reset page when click new category
  useEffect(() => {
    dispatch(resetPage());
  }, [genreIdOrCategoryName]);

  useEffect(() => {
    if (searchQuery) {
      navigate('/');
    }
  }, [searchQuery]);

  return (
    <div className="flex relative bg-[#F6F6F6]">
      { activeMenu ? <Sidebar /> : <div className="w-0" /> }
      <main className={`w-full min-h-screen mx-4 ${activeMenu ? 'lg:ml-72' : 'flex-2'}`}>
        <Navbar />
        <div className="mt-24 mx-8">
          <Routes>
            <Route path="/" element={<Movies />} />
            <Route path="/actors/:id" element={<Actors />} />
            <Route path="/movie/:id" element={<MovieInformation />} />
            <Route path="/profile/:id" element={<Profile />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default App;
