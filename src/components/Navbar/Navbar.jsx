import React from 'react';
import { HiMenuAlt2, HiMenuAlt3 } from 'react-icons/hi';

import { useStateContext } from '../../context/ContextProvider';
import SearchBar from '../SearchBar/SearchBar';

const Navbar = () => {
  const { activeMenu, setActiveMenu } = useStateContext();

  return (
    <header className="w-full fixed z-40 bg-[#F6F6F6]">
      <div className="flex items-center gap-5 px-3 lg:px-8 py-4">
        {/* Menu Icon */}
        <div className="text-2xl text-[#707A85] cursor-pointer">
          {activeMenu ? <HiMenuAlt3 onClick={() => setActiveMenu(false)} /> : <HiMenuAlt2 onClick={() => setActiveMenu(true)} />}
        </div>

        {/* Search Bar */}
        <SearchBar />
      </div>

    </header>
  );
};

export default Navbar;
