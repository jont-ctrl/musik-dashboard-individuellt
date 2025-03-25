import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
export default function NavHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

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
    <header className='bg-primary dark:bg-primary-dark text-white py-6 px-8 sticky top-0 z-50 transition-all duration-500 ease-in-out  rounded-bl-xl rounded-br-xl'>
      <nav className='flex justify-between items-center'>
        {/* Logo (klickbar länk till startsidan) */}
        <Link
          to='/'
          className='text-4xl font-extrabold text-white hover:text-tertiary active:scale-90 transition-all duration-200 transform hover:scale-110'
        >
          BeatStats
        </Link>

        {/* Desktop Menu */}
        <ul className='hidden md:flex space-x-12 text-lg text-white font-medium'>
          <li>
            <Link
              to='/'
              className='nav-link hover:text-tertiary hover:scale-110 active:scale-90 transition-all duration-200 transform inline-block'
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to='/top-songs'
              className='nav-link hover:text-tertiary hover:scale-110 active:scale-90 transition-all duration-200 transform inline-block'
            >
              Top Songs
            </Link>
          </li>
          <li>
            <Link
              to='/profiles'
              className='nav-link hover:text-tertiary hover:scale-110 active:scale-90 transition-all duration-200 transform inline-block'
            >
              Profiles
            </Link>
          </li>
        </ul>
        <button
          className='flex items-center justify-center cursor-pointer hover:scale-110 active:scale-90 transition-all duration-200 transform'
          onClick={handleDarkMode}
        >
          {darkMode ? (
            <span className='material-icons'>light_mode</span>
          ) : (
            <span className='material-icons'>dark_mode</span>
          )}
        </button>

        {/* Hamburger Icon for Mobile */}
        <button
          onClick={toggleMenu}
          className='md:hidden flex flex-col items-center space-y-2'
          aria-expanded={isOpen ? 'true' : 'false'} // Accessibility
          aria-label='Toggle menu'
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
        } md:hidden overflow-hidden bg-primary transition-all duration-500 ease-in-out`}
      >
        <ul className='flex flex-col items-center space-y-6 py-6 text-white text-lg font-semibold'>
          <li>
            <Link
              to='/'
              className='nav-link hover:text-tertiary hover:scale-110 active:scale-90 transition-all duration-200 transform inline-block'
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to='/top-songs'
              className='nav-link hover:text-tertiary hover:scale-110 active:scale-90 transition-all duration-200 transform inline-block'
            >
              Top Songs
            </Link>
          </li>
          <li>
            <Link
              to='/profiles'
              className='nav-link hover:text-tertiary hover:scale-110 active:scale-90 transition-all duration-200 transform inline-block'
            >
              Profiles
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
