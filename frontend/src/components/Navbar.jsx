import React, { useState, useEffect, useRef } from "react";

import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/user.slice";
import { AcmeLogo } from "./AcmeLogo.jsx";
import { PiShoppingCartSimpleBold } from "react-icons/pi";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const location = useLocation();
  const cartReducer = useSelector((state) => state.cartReducer);
  const { cartItems } = cartReducer;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getNavLinkClass = (path) => {
    return location.pathname === path
      ? "text-black font-semibold px-4 py-2 rounded hover:text-black-900 "
      : " hover:font-semibold px-4 py-2 rounded text-[#00000099] ";
  };
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
    closeDropdown();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="sticky top-5 z-50">
      <div className="max-w-screen-xl px-10 lg:px-40 flex flex-wrap items-center justify-between mx-auto relative">
        <Link
          to="/"
          className="flex hover:scale-105 transition-transform duration-400 ease-in-out transition-timing-function-custom items-center"
        >
          <AcmeLogo />
          <span className=" self-center uppercase font-ibm-plex-mono font-extra-bold whitespace-nowrap">
            SoundScape
          </span>
        </Link>
        <div className="hidden backdrop-blur-18 saturate-150 bg-black-20 clip-path-inset-round will-change-opacity md:flex items-center justify-center mx-auto rounded-xl">
          <Link to="/" className={getNavLinkClass("/")}>
            <p className="hover:text-black">главная</p>
          </Link>
          <Link to="/catalog" className={getNavLinkClass("/catalog")}>
            <p className="hover:text-black">каталог</p>
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-label="Open main menu"
          onClick={toggleMenu}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full md:block md:w-auto`}
          id="navbar-dropdown"
        >
          <ul className="flex flex-col bg-white rounded-2xl items-center font-medium p-4 md:p-0 mt-4 border border-gray-100  md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent">
            <li className="">
              <div className="md:hidden   md:flex items-center justify-center mx-auto rounded-xl">
                <Link to="/" className={getNavLinkClass("/")}>
                  <p className="hover:text-black">главная</p>
                </Link>
                <Link to="/catalog" className={getNavLinkClass("/catalog")}>
                  <p className="hover:text-black">каталог</p>
                </Link>
              </div>
            </li>

            {currentUser ? (
              <li
                className="relative hover:scale-105 transition-transform duration-400 ease-in-out transition-timing-function-custom"
                ref={dropdownRef}
              >
                <button
                  id="dropdownNavbarLink"
                  className={`flex items-center justify-between w-full py-2 pl-3 pr-4 text-gray-900 rounded  md:hover:bg-transparent md:border-0  md:p-0 md:w-auto ${
                    isDropdownOpen ? "" : ""
                  }`}
                  onClick={toggleDropdown}
                  aria-expanded={isDropdownOpen ? "true" : "false"}
                >
                  {currentUser.name}{" "}
                  <svg
                    className={`w-5 h-5 ml-1 ${
                      isDropdownOpen ? "transform rotate-180" : ""
                    }`}
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <div
                  id="dropdownNavbar"
                  className={`absolute z-10 ${
                    isDropdownOpen ? "block" : "hidden"
                  } font-normal mt-3 backdrop-blur-18 saturate-150 bg-black-20 clip-path-inset-round will-change-opacitydivide-y divide-gray-100 rounded-lg shadow w-44`}
                >
                  <ul
                    className="py-2 text-sm font-semibold text-black-900"
                    aria-labelledby="dropdownLargeButton"
                  >
                    <li>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={closeDropdown}
                      >
                        Профиль
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/orders"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={closeDropdown}
                      >
                        Заказы
                      </Link>
                    </li>
                    <li
                      className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={handleLogout}
                    >
                      Выйти ({currentUser.name})
                    </li>
                  </ul>
                </div>
              </li>
            ) : (
              <li>
                <Link
                  to="/login"
                  className="hover:scale-105 transition-transform duration-400 ease-in-out transition-timing-function-custom block py-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:p-0"
                >
                  Login
                </Link>
              </li>
            )}
            <li className="rounded-md px-4 py-1 hover:scale-105 transition-transform duration-400 ease-in-out transition-timing-function-custom bg-black">
              <Link
                to="/cart"
                className="block flex py-2 gap-1 items-center pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:p-0"
              >
                <PiShoppingCartSimpleBold /> {cartItems.length}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
