import React from 'react';
import { Link } from 'react-scroll';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full p-4 bg-black text-white z-50">
      <nav className="flex justify-between items-center">
        <div className="font-bold text-xl">RATHOLE</div>
        <ul className="flex space-x-4">
          <li>
            <Link
              activeClass="active"
              to="home"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              className="hover:underline cursor-pointer"
            >
              Home
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
              className="hover:underline cursor-pointer"
            >
              Work
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
              className="hover:underline cursor-pointer"
            >
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
