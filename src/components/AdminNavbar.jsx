import React from 'react'
import { Link } from 'react-router-dom'

const AdminNavbar = () => {
  const logoutHandler = () => {
    localStorage.removeItem("token")
    window.location.href="/admin/login"
  }
  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-4  dark:bg-gray-800">
    <div className="container flex flex-wrap justify-between items-center mx-auto">
      <Link href="#" className="text-white">
        My Logo
      </Link>
      <button data-collapse-toggle="mobile-menu" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
       My Logo
       </button>
      <div className="hidden w-full md:block md:w-auto" id="mobile-menu">
        <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
          <li>
            <Link to="/admin" className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white">Home</Link>
          </li>
          <li>
            <Link onClick={logoutHandler} className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white">
                Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  )
}

export default AdminNavbar