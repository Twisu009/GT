// register.tsx
import Link from "next/link";
import React from "react";

export const Register = () => {
  //login page content will go here

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "200px",
          color: "#6BD3C6",
          fontSize: "1.5rem",
        }}
      >
        <h1>Register New Account</h1>
      </div>
      <form className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-y-6">
          <div>
            <label
              htmlFor="username"
              className="align-center text-sm font-semibold leading-6 text-gray-900"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              required
              className="block w-full border-full border-b border-gray-300 focus:border-indigo-600 px-3.5 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-600 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="email-id"
              className="align-center text-sm font-semibold leading-6 text-gray-900"
            >
              Email-id
            </label>
            <input
              type="text"
              id="email-id"
              required
              className="block w-full border-full border-b border-gray-300 focus:border-indigo-600 px-3.5 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-600 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="date of birth"
              className="align-center text-sm font-semibold leading-6 text-gray-900"
            >
              Date of Birth
            </label>
            <input
              type="text"
              id="date of birth"
              required
              className="block w-full border-full border-b border-gray-300 focus:border-indigo-600 px-3.5 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-600 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              className="block w-full border-full border-b border-gray-300 focus:border-indigo-600 px-3.5 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-600 sm:text-sm"
            />
          </div>
        </div>

        <div className="Register-button">
          <Link href="/pages/login">
            <button
              className="block mx-auto w-24 mt-8 px-3.5 py-2.5 text-center text-sm font-semibold text-black rounded-md shadow-sm hover:bg-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600"
              style={{ backgroundColor: "#6BD3C6" }}
            >
              Create
            </button>
          </Link>
        </div>
      </form>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "50px",
          //color: "#6BD3C6",
        }}
      >
        <h1>
          Already have an account?{" "}
          <a href="/pages/login">
            <u>Login now.</u>
          </a>
        </h1>
      </div>
    </div>
  );
};

export default Register;
