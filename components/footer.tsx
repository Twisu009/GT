"use client";
import Image from "next/image";

export default function Footer() {
  return (
    <footer
      className="py-5 flex flex-col justify-center bg-595A5B rounded-lg .static"
      style={{ backgroundColor: "D9D9D9", width: "100%" }}
    >
      <div className="w-full max-w-screen-xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between">
          <div className="flex gap-2">
            {/* <a className="flex items-center mb-4 md:mb-0 space-x-3 rtl:space-x-reverse">
              <Image
                src={"/static/images/gtrove-logo.png"}
                alt="G-Trove logo"
                width={150}
                height={150}
                quality={100}
              />
            </a> */}
            <span className="ml-4 mt-1 text-sm text-gray-500">
              All rights reserved © 2024{" "}
              <a className="hover:underline">Twisu™</a>
            </span>
          </div>

          <ul className="flex flex-col md:flex-row items-start mb-6 text-sm font-medium text-gray-500 md:mb-0">
            <li className="mb-2 md:mb-0 md:me-6">
              <a href="/pages/AboutUs" className="hover:underline block">
                About Us
              </a>
            </li>
            <li className="mb-2 md:mb-0 md:me-6">
              <a href="/pages/genre" className="hover:underline block">
                Genres
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* <hr className="p-2 mt-3 border-gray-400" /> */}
    </footer>
  );
}
