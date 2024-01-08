
import React, { useState } from 'react';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { User } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { useLogout } from '../../../hooks/useLogout';
import LanguageToggle from '../../../hooks/useLanguage';
import ThemeSelector from '../../../pages/themeSelector';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuthContext() as { user: User };
  const { logout } = useLogout();
  const { t } = useTranslation();
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (

    <nav className="bg-gray-800 p-2 w-full fixed flex justify-between text-white items-center z-50">
      <h1 className=" text-2xl font-bold mr-5 mr-5" >
        <Link to ="/" >iBalance</Link></h1>
  
       {/*  small screens */}
       <div className="lg:hidden flex-grow flex justify-center">
        <button onClick={toggleMobileMenu} className="text-white focus:outline-none">
          
          {isMobileMenuOpen ? (
            // X icon when menu is open
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          ) : (
            // Hamburger icon when menu is closed
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          )}
        </button>
       </div>

        {/*  large screens */}
        <div className="hidden lg:flex ">
        {user && (
          <>
            <Link to="/" className="nav-link m-5 hover:text-blue-400" >
            {t('home')}
            </Link>
            <Link to="/about" className="nav-link m-5 hover:text-blue-400">
            {t('reports')}

            </Link>
            <button onClick={logout} className="nav-link m-5 hover:text-blue-400">
            {t('logout')}
            </button>

          </>
        )}

       {/* navbar links when user not exist  */}
        {!user && (
          <>
          <div>
            <Link to="/login" className="nav-link m-5 hover:text-blue-400">
            {t('login')}
            </Link>
            <Link to="/signup" className="nav-link m-5 hover:text-blue-400">
            {t('signup')}
            </Link></div>


          </>
        )} 
        </div>

   {/* toggle buttons */}
        <LanguageToggle />
        <ThemeSelector />

     {/* mobile menu */}
    {isMobileMenuOpen && (
      <div className="lg:hidden fixed inset-0 z-50" onClick={toggleMobileMenu}>
       <div className="flex flex-col items-center text-white mt-12 h-full">

         <button
            className="text-white focus:outline-none absolute top-4 right-4"
            onClick={toggleMobileMenu} >
         </button>

      <div className="max-w-screen-xl flex flex-wrap items-center justify-between p-4"> </div>
      <div className="w-full bg-gray-500 dark:bg-gray-800 dark:border-gray-700">

   {/* navbar links when user exist  */}
        <ul className="flex flex-col font-medium rounded-lg">
          {user ? (
            <>
              <li>
                <Link to="/" className="block py-2 px-3 text-white bg-blue-700 rounded dark:bg-blue-600" aria-current="page">
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  {t('reports')}
                </Link>
              </li>
              <li>
                <button onClick={logout} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  {t('logout')}
                </button>
              </li>
            </>
          ) : (
            <>
               {/* if user logged out  */}

              <li>
                <Link to="/login" className="block py-2 px-3 text-white bg-blue-700 rounded dark:bg-blue-600" aria-current="page">
                  {t('login')}
                </Link>
              </li>
              <li>
                <Link to="/signup" className="block py-2 px-3 text-red-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  {t('signup')}
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  </div>
)}
</nav>
);
          }
export default Navbar;