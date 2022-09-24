import React from 'react';
import { BeatLoader } from 'react-spinners';
import { useDispatch, useSelector } from 'react-redux';
import { MdUpcoming } from 'react-icons/md';
import { HiMenuAlt3 } from 'react-icons/hi';
import { BiSquareRounded } from 'react-icons/bi';
import { BsFillSquareFill } from 'react-icons/bs';
import { AiFillCompass, AiFillStar } from 'react-icons/ai';

import { NavLink } from 'react-router-dom';
import { useGetGenresQuery } from '../../services/TMDB';
import { useStateContext } from '../../context/ContextProvider';
import { resetQueryAndGenreOrCategory, selectGenreOrCategory } from '../../features/currentGenreOrCategory';

const menuList = [
  { label: 'Browse', icon: <AiFillCompass />, value: 'popular' },
  { label: 'Top Rated', icon: <AiFillStar />, value: 'top_rated' },
  { label: 'Upcoming', icon: <MdUpcoming />, value: 'upcoming' },
];

const Sidebar = () => {
  const { activeMenu, setActiveMenu, screenSize } = useStateContext();
  const { data, isError, isFetching } = useGetGenresQuery();
  const { genreIdOrCategoryName } = useSelector((state) => state.currentGenreOrCategory);
  const dispatch = useDispatch();

  return (
    <nav className="fixed w-72 h-screen overflow-auto pl-6 pr-4 pb-10 bg-[#F6F6F6] border-r border-r-[#DDDDDD] z-50">
      {/* Sidebar Logo */}
      <NavLink
        to="/"
        onClick={() => dispatch(resetQueryAndGenreOrCategory())}
        className="flex justify-between items-center mt-12 hover:cursor-pointer"
      >
        <h1 className="text-3xl text-[#707A85] font-bold">
          Movidex <span className="text-[#646FD4]">.</span>
        </h1>
        { activeMenu && screenSize <= 1024
          && (
          <div className="text-2xl text-[#707A85] cursor-pointer" onClick={() => setActiveMenu(false)}>
            <HiMenuAlt3 />
          </div>
          )}
      </NavLink>

      {/* Menu */}
      <div className="mt-8">
        <h4 className="text-[#9AA2A9] uppercase">Menu</h4>
        <div className="flex flex-col mt-5 gap-3">
          {menuList.map((menu, index) => (
            <NavLink
              key={index}
              to="/"
              className={`flex items-center gap-4 px-4 py-3  
            hover:cursor-pointer hover:bg-gray-200 hover:rounded-lg hover:border-none
            ${genreIdOrCategoryName === menu.value ? 'border-r-2 border-r-[#646FD4]' : ''}`}
              onClick={() => {
                dispatch(selectGenreOrCategory(menu.value));
                if (screenSize <= 1024) {
                  setActiveMenu(false);
                }
              }}
            >
              <div className={`${genreIdOrCategoryName === menu.value ? 'text-[#646FD4]' : 'text-[#707A85]'}`}>
                {menu.icon}
              </div>
              <p className={`text-lg text-[#9AA2A9] ${genreIdOrCategoryName === menu.value ? 'font-semibold' : ''}`}>{menu.label}</p>
            </NavLink>
          ))}
        </div>
      </div>

      {/* Genres */}
      <div className="mt-8">
        <h4 className="text-[#9AA2A9] uppercase">Genres</h4>
        <div className="flex flex-col mt-5 gap-3">
          { isFetching && !isError && (<BeatLoader className="mx-auto" color="#707A85" />)}
          { !isFetching && !isError && data.genres.length && (
            data.genres.map(({ id, name }) => (
              <NavLink
                to="/"
                key={id}
                className={`flex items-center gap-4 px-4 py-3 hover:rounded-lg hover:border-none hover:bg-gray-200 cursor-pointer ${genreIdOrCategoryName === id ? 'border-r-2 border-r-[#646FD4]' : ''}`}
                onClick={() => {
                  dispatch(selectGenreOrCategory(id));
                  if (screenSize <= 1024) {
                    setActiveMenu(false);
                  }
                }}
              >
                {genreIdOrCategoryName === id ? (
                  <>
                    <BsFillSquareFill className="text-[#646FD4]" />
                    <p className="text-lg text-[#646FD4] font-semibold">{name}</p>
                  </>
                ) : (
                  <>
                    <BiSquareRounded className="text-[#707A85]" />
                    <p className="text-lg text-[#9AA2A9]">{name}</p>
                  </>
                ) }

              </NavLink>
            ))
          )}
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
