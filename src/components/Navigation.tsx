import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";

interface prop {
  token?: string | null;
  userId ?: string | null;
}

const Navigation = ({token, userId} : prop) => {

  const [loginOrNot, setLoginOrNot] = useState<boolean>();

  useEffect(() => {
    if (token === undefined) {
      setLoginOrNot(false);
    } else {
      setLoginOrNot(true);
    }
  }, [token]);

  return (
    <nav className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <h1 className="text-2xl font-bold tracking-wide">
          <Link to="/" className="hover:text-yellow-300 transition duration-300">
            🚗 Used Car Sales
          </Link>
        </h1>

        {/* Navigation Links */}
        <div className="space-x-6 text-lg">
          <Link
            to="/"
            className="hover:text-yellow-300 transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/about-us"
            className="hover:text-yellow-300 transition duration-300"
          >
            About
          </Link>
          <Link
            to="/contact-us"
            className="hover:text-yellow-300 transition duration-300"
          >
            Contact
          </Link>
          <Link
            to="/faq"
            className="hover:text-yellow-300 transition duration-300"
          >
            FAQ
          </Link>
        </div>

        {/* Call-to-Action Buttons */}
        {
          !loginOrNot? (
            <div className="space-x-4">
            <Link
              to="/login"
              className="px-4 py-2 bg-white text-blue-600 font-semibold rounded shadow hover:bg-blue-100 transition duration-300"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-yellow-400 text-indigo-900 font-semibold rounded shadow hover:bg-yellow-300 transition duration-300"
            >
              Register
            </Link>
          </div>) : (
            <Link
              to={`/profile/${userId}`}
              className="px-2 py-1 bg-white text-gray-800 font-semibold rounded shadow hover:bg-blue-100 transition duration-300"
            >
              <FaUserCircle className='text-3xl'/>
            </Link>
          )
        }
      </div>
    </nav>
  );
};

export default Navigation;
