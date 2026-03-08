import React from "react";
import {Link, NavLink} from 'react-router-dom'
import logo from '../assets/paw-svgrepo-com.svg'
function Header() {
  return (
    <nav className="shadow-md ">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between ">
            <img src={logo} alt="Logo" className="w-10 h-10"/>
            <Link to="/" className="text-4xl font-bold">
                Comanda Bravo
            </Link>

            <div className="hidden md:flex space-x-6">
                <NavLink to = "/"  className={' px-4 py-3 rounded-lg font-medium text-gray-700 transition duration-300 hover:bg-green-100 hover:text-green-700'}>Home</NavLink>
                <NavLink to = "/about" className={' px-4 py-3 rounded-lg font-medium text-gray-700 transition duration-300 hover:bg-green-100 hover:text-green-700'}>About</NavLink>
                <NavLink to = "/contact" className={' px-4 py-3 rounded-lg font-medium text-gray-700 transition duration-300 hover:bg-green-100 hover:text-green-700'}>Contact</NavLink>

            </div>
        </div>
    </nav>
  );
}

export default Header;
