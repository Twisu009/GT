"use client";

import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faHeart } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";

const Navbar = () => {
  const [isClick, setisClick] = useState(false);

  const toggleNavbar = () => {
    setisClick(!isClick);
  };

  return (
    <>
      <nav className="bg-purewhite-500 pt-10 pb-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <a href="/" className="text-black">
                  Logo
                </a>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center space-x-4">
                <a
                  href="/"
                  className="text-black hover:bg-grey hover:text-black rounded-lg"
                >
                  Home
                </a>

                <div className="relative">
                  <button
                    onClick={() => setisClick(!isClick)}
                    className="text-black hover:bg-grey hover:text-black rounded-lg"
                  >
                    Genres
                  </button>
                  {isClick && (
                    <div className="absolute mt-2 w-32 bg-white shadow-lg rounded-lg">
                      <a
                        href="/pages/genre/action"
                        className="block py-2 px-4 text-gray-800 hover:bg-gray-300"
                      >
                        Action
                      </a>
                      <a
                        href="/pages/genre/horror"
                        className="block py-2 px-4 text-gray-800 hover:bg-gray-300"
                      >
                        Horror
                      </a>
                      <a
                        href="/pages/genre/adventure"
                        className="block py-2 px-4 text-gray-800 hover:bg-gray-300"
                      >
                        Adventure
                      </a>
                      <a
                        href="/pages/genre/multiplayer"
                        className="block py-2 px-4 text-gray-800 hover:bg-gray-300"
                      >
                        Multiplayer
                      </a>
                    </div>
                  )}
                </div>
                <a
                  href="/developer-content"
                  className="text-black hover:bg-grey hover:text-black rounded-lg"
                >
                  Developer Content
                </a>
                <a
                  href="/pages/AboutUs"
                  className="text-black hover:bg-grey hover:text-black rounded-lg"
                >
                  About Us
                </a>
              </div>
            </div>
            <div className="md:hidden flex items-center">
              <button
                className="inline  -flex items-center justify-center p-2 rounded-md text-black md:text-black 
              hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={toggleNavbar}
              >
                {isClick ? (
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
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
                    xmlns="http://www.w3.org/2000/svg"
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
        </div>
        {isClick && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a
                href="/"
                className="text-black block hover:bg-grey hover:text-black rounded-lg"
              >
                Home
              </a>
              <a
                href="/pages/genre"
                className="text-black block hover:bg-grey hover:text-black rounded-lg"
              >
                Genres
              </a>
              <a
                href="/developer-content"
                className="text-black block hover:bg-grey hover:text-black rounded-lg"
              >
                Developer Content
              </a>
              <a
                href="/pages/AboutUs"
                className="text-black block hover:bg-grey hover:text-black rounded-lg"
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

// export default function Navbar() {
//   return (
//     <nav className="flex items-center justify-between py-4 max-w-5xl mx-auto">
//       {/* Logo */}
//       <Image
//         src={"/static/images/gtrove-logo.png"}
//         alt="G-Trove logo"
//         width={150}
//         height={150}
//         quality={100}
//       />

//       {/* Navigation Links */}
//       <div className="hidden md:flex gap-5">
//         {" "}
//         {/* Hide on small screens */}
//         <Link href={"/"}>Home</Link>
//         <Link href={"/pages/genre"}>Genre</Link>
//         <Link href={"/developer-content"}>Developer Content</Link>
//         <Link href={"/pages/AboutUs"}>About Us</Link>
//         <Link href={"/wishlist"}></Link>
//       </div>

//       {/* Search Box */}
//       <div className="relative flex items-right gap-3">
//         <input
//           type="text"
//           placeholder="Search.."
//           className="border rounded-full bg-gray-200 px-3 py-2 w-25 pl-12"
//         />
//         <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
//           {/* Search Icon */}
//           <FontAwesomeIcon icon={faSearch} className="h-5 w-5" />
//         </span>
//       </div>

//       {/* Heart Icon */}
//       <FontAwesomeIcon
//         icon={faHeart}
//         className="text-gray-300 hover:text-cyan-300 cursor-pointer h-5 w-5 md:block hidden"
//       />
//     </nav>
//   );
// }

export default Navbar;
