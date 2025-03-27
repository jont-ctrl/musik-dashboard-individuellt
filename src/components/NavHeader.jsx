import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { HelloContext } from '../context/HelloContext';

export default function NavHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const { userName, setUserName } = useContext(HelloContext);

  function handleDarkMode() {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', !darkMode);
  }

  // On first load get dark mode setting localstorage
  useEffect(() => {
    localStorage.getItem('darkMode') === 'true'
      ? (setDarkMode(true), document.documentElement.classList.add('dark'))
      : (setDarkMode(false), document.documentElement.classList.remove('dark'));
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header
      className='bg-primary dark:bg-primary-dark text-white py-6 px-8 sticky top-0 z-50 transition-all duration-500 ease-in-out rounded-bl-xl rounded-br-xl'
      role='banner'
    >
      <nav
        className='flex justify-between items-center'
        aria-label='Main navigation'
      >
        {/* Logo (klickbar länk till startsidan) */}
        <Link
          to='/'
          className='text-4xl font-extrabold text-white hover:text-tertiary active:scale-90 transition-all duration-200 transform hover:scale-110'
          aria-label='Go to homepage'
        >
          BeatStats
        </Link>

        {/* Desktop Menu */}
        <ul
          className='hidden md:flex space-x-12 text-lg text-white font-medium'
          role='menu'
        >
          <li role='menuitem'>
            <Link
              to='/'
              className='nav-link hover:text-tertiary hover:scale-110 active:scale-90 transition-all duration-200 transform inline-block'
              aria-label='Go to Home page'
            >
              Home
            </Link>
          </li>
          <li role='menuitem'>
            <Link
              to='/top-songs'
              className='nav-link hover:text-tertiary hover:scale-110 active:scale-90 transition-all duration-200 transform inline-block'
              aria-label='Go to Top Songs page'
            >
              Top Songs
            </Link>
          </li>
          <li role='menuitem'>
            <Link
              to='/profiles'
              className='nav-link hover:text-tertiary hover:scale-110 active:scale-90 transition-all duration-200 transform inline-block'
              aria-label='Go to Profiles page'
            >
              Profiles
            </Link>
          </li>
          {/* Add username for desktop */}
          <li role='menuitem'>
            <p
              className='text-white text-lg font-medium'
              aria-label={`Logged in as ${userName}`}
            >
              {userName}
            </p>
          </li>
        </ul>

        {/* Dark Mode Toggle */}
        <button
          className='flex items-center justify-center cursor-pointer hover:scale-110 active:scale-90 transition-all duration-200 transform'
          onClick={handleDarkMode}
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? (
            <span className='material-icons' aria-hidden='true'>
              light_mode
            </span>
          ) : (
            <span className='material-icons' aria-hidden='true'>
              dark_mode
            </span>
          )}
        </button>

        {/* Hamburger Icon for Mobile */}
        <button
          onClick={toggleMenu}
          className='md:hidden flex flex-col items-center space-y-2'
          aria-expanded={isOpen ? 'true' : 'false'}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          <span className='w-7 h-0.5 bg-white transform transition-all duration-200'></span>
          <span className='w-7 h-0.5 bg-white transform transition-all duration-200'></span>
          <span className='w-7 h-0.5 bg-white transform transition-all duration-200'></span>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        } md:hidden overflow-hidden bg-primary dark:bg-primary-dark transition-all duration-500 ease-in-out`}
        aria-hidden={!isOpen}
      >
        <ul
          className='flex flex-col items-center space-y-6 py-6 text-white text-lg font-semibold'
          role='menu'
        >
          <li role='menuitem'>
            <Link
              to='/'
              className='nav-link hover:text-tertiary hover:scale-110 active:scale-90 transition-all duration-200 transform inline-block'
              aria-label='Go to Home page'
            >
              Home
            </Link>
          </li>
          <li role='menuitem'>
            <Link
              to='/top-songs'
              className='nav-link hover:text-tertiary hover:scale-110 active:scale-90 transition-all duration-200 transform inline-block'
              aria-label='Go to Top Songs page'
            >
              Top Songs
            </Link>
          </li>
          <li role='menuitem'>
            <Link
              to='/profiles'
              className='nav-link hover:text-tertiary hover:scale-110 active:scale-90 transition-all duration-200 transform inline-block'
              aria-label='Go to Profiles page'
            >
              Profiles
            </Link>
          </li>
          {/* Add username for mobile */}
          <li role='menuitem'>
            <p
              className='text-white text-lg font-medium'
              aria-label={`Logged in as ${userName}`}
            >
              {userName}
            </p>
          </li>
        </ul>
      </div>
    </header>
  );
}
