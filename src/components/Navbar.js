import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex-shrink-0">
            <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              PM Internship
            </h2>
          </Link>
          <ul className="flex space-x-1 items-center">
            <li>
              <Link to="/" className="px-4 py-2 text-sm text-gray-300 hover:text-indigo-400 hover:bg-gray-800 rounded-lg transition-all duration-200">
                Home
              </Link>
            </li>
            <li>
              <Link to="/category" className="px-4 py-2 text-sm text-gray-300 hover:text-indigo-400 hover:bg-gray-800 rounded-lg transition-all duration-200">
                Category
              </Link>
            </li>
            {isAuthenticated && (
              <>
                <li>
                  <Link to="/dashboard" className="px-4 py-2 text-sm text-gray-300 hover:text-indigo-400 hover:bg-gray-800 rounded-lg transition-all duration-200">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/profile" className="px-4 py-2 text-sm text-gray-300 hover:text-indigo-400 hover:bg-gray-800 rounded-lg transition-all duration-200">
                    Profile
                  </Link>
                </li>
                <li className="ml-2">
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm text-white bg-gradient-to-r from-red-500 to-red-600 rounded-lg font-medium hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-sm hover:shadow"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
            {!isAuthenticated && (
              <>
                <li>
                  <Link to="/login" className="px-4 py-2 text-sm text-gray-300 hover:text-indigo-400 hover:bg-gray-800 rounded-lg transition-all duration-200">
                    Login
                  </Link>
                </li>
                <li className="ml-2">
                  <Link to="/signup" className="px-4 py-2 text-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-sm hover:shadow">
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

