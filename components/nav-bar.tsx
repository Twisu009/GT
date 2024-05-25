"use client";

import React, { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { InfoModal } from "./ui/info-modal";
import Link from "next/link";
import {
  getUserDetailsInLocalStorage,
  removeUserFromLocalStorage,
} from "@/utilities/local-storage";
import { useIsFirstRender } from "@/utilities/useFirstRender";

const Navbar = () => {
  const userDetails = getUserDetailsInLocalStorage();
  const isFirstRender = useIsFirstRender();
  const [isClick, setisClick] = useState(false);
  const [avatarModal, setAvatarModal] = useState(false);
  const toggleNavbar = () => {
    setisClick(!isClick);
  };
  const handleLogout = () => {
    removeUserFromLocalStorage();
  };
  if (isFirstRender) return null;

  return (
    <>
      <nav className="bg-purewhite-500 pt-5 pb-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo on the left */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <a href="/" className="text-black">
                <img
                  className="w-40 h-auto"
                  src="/static/images/gtrove-logo.png"
                  alt="gtrove logo"
                />
              </a>
            </div>
          </div>

          {/* Navbar content in the center */}
          <div className="flex justify-center hidden md:flex flex-grow mr-28">
            <div className="ml-4 flex items-center space-x-4">
              <a href="/" className="text-black relative group">
                Home
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-custom-teal transition-all duration-300 group-hover:w-full"></span>
              </a>
              <div className="relative">
                <a href="/pages/genre" className="text-black relative group">
                  Genres
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-custom-teal transition-all duration-300 group-hover:w-full"></span>
                </a>
              </div>
              <a href="/pages/user" className="text-black relative group">
                Developer Content
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-custom-teal transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="/pages/AboutUs" className="text-black relative group">
                About Us
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-custom-teal transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>
          </div>

          {userDetails && (
            <div
              className="flex justify-center p-2 items-center text-black rounded-full bg-gray-300 hover:bg-black hover:text-white hover:cursor-pointer"
              onClick={() => setAvatarModal(!avatarModal)}
            >
              {userDetails.Username.slice(0, 3)}
            </div>
          )}
          {avatarModal && (
            <div
              className="origin-top-right absolute z-50 right-8 mt-32 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
              onClick={() => setAvatarModal(!avatarModal)}
            >
              <div className="py-1" role="none">
                <Link
                  href="/pages/user/wishlist"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  <div className="flex justify-center items-center">
                    <div className="pr-2">Wishlist</div>
                    <FaRegHeart style={{ fontSize: "1rem" }} />
                  </div>
                </Link>
                <Link
                  href="/pages/user/games"
                  className="flex justify-center items-center block px-4 py-2 text-sm text-green-700 hover:bg-green-100 hover:text-green-900"
                  role="menuitem"
                >
                  My Games
                </Link>
                <Link
                  href="/pages/login"
                  className="flex justify-center items-center block px-4 py-2 text-sm text-red-700 hover:bg-red-100 hover:text-red-900"
                  role="menuitem"
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              </div>
            </div>
          )}

          {!userDetails && (
            <div className="flex justify-center gap-1">
              <Link
                className="py-1 px-3 rounded-2xl hover:bg-custom-teal hover:text-custom-blue-green hover:underline"
                href="/pages/login"
              >
                Login
              </Link>
              <label className="pt-1 pb-1 pl-3 pr-3"> | </label>
              <Link
                className="pt-1 pb-1 pl-3 pr-3 rounded-2xl hover:bg-custom-blue-green hover:text-white hover:underline"
                href="/pages/register"
                style={{ color: "#6BD3C6" }}
              >
                Register
              </Link>
            </div>
          )}
          {/* Toggle button for mobile */}
          <div className="md:hidden flex items-center">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-black md:text-black 
              hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={toggleNavbar}
            >
              {isClick ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6L12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6H16M4 12h16m-7 67H"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        {isClick && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a
                href="/"
                className="text-black block hover:underline hover:bg-grey hover:text-black rounded-lg"
              >
                Home
              </a>
              <a
                href="/pages/genre"
                className="text-black block hover:underline hover:bg-grey hover:text-black rounded-lg"
              >
                Genres
              </a>
              <a
                href="/developer-content"
                className="text-black block hover:underline hover:bg-grey hover:text-black rounded-lg"
              >
                Developer Content
              </a>
              <a
                href="/pages/AboutUs"
                className="text-black block hover:underline hover:bg-grey hover:text-black rounded-lg"
              >
                About Us
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
