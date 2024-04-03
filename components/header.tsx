"use client";

import Link from "next/link";
import { useState } from "react";

// Mock authentication status
const isAuthenticated = true; // shows logout when logged

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="relative">
      <div className="absolute right-5 top-4 lg:top-6 xl:right-28 lg:right-10">
        {/* Toggle Menu Button */}
        <button
          className="block lg:hidden text-gray-700 focus:outline-none"
          onClick={toggleMenu}
        >
          {isOpen ? (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
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
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
        {/* Menu Links */}
        <nav className={`${isOpen ? "block" : "hidden"} lg:block lg:relative`}>
          <ul className="lg:flex lg:items-center lg:space-x-3 lg:space-y-0">
            {/* Conditionally rendersd login or logout based on authentication status */}
            {isAuthenticated ? (
              <>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <span>|</span>
                <li>
                  <Link href="/">Logout</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/pages/login">Login</Link>
                </li>
                <span>|</span>
                <li>
                  <Link href="/pages/register" style={{ color: "#6BD3C6" }}>
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
