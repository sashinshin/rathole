import React from "react";
import { Link } from "react-scroll";

const Header: React.FC = () => {
  return (
    <header className="fixed top-2 inset-x-4 pt-4 bg-white text-black border-2 border-black z-50">
      <nav className="grid grid-rows-2 sm:flex sm:justify-between sm:items-center">
        <div className="text-center font-bold text-2xl border-b-2 border-black pb-3 sm:border-b-0 sm:pl-4">
          RATHOLE
        </div>
        <ul className="text-center justify-center pt-2 flex space-x-20 sm:pt-0 sm:pb-3 sm:space-x-10 sm:pr-10">
          <li>
            <Link
              activeClass="active"
              to="home"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              className="hover:blur cursor-pointer"
            >
              home
            </Link>
          </li>
          <li>
            <Link
              activeClass="active"
              to="work"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              className="hover:blur cursor-pointer"
            >
              work
            </Link>
          </li>
          <li>
            <Link
              activeClass="active"
              to="about"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              className="hover:blur cursor-pointer"
            >
              about
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
{
  /* <nav className="flex justify-between items-center">
<div className="font-bold text-xl">RATHOLE</div>
<ul className="flex space-x-4"> */
}
