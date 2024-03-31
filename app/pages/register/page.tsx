import React from "react";
import Link from "next/link";

const Register = () => {
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
          {/* Other input fields for email, date of birth, and password */}
        </div>

        <div className="Register-button">
          <Link href="/pages/login">
            <button
              type="submit"
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
        }}
      >
        <h1>
          Already have an account?{" "}
          <Link href="/pages/login">
            <a>
              <u>Login now.</u>
            </a>
          </Link>
        </h1>
      </div>
    </div>
  );
};

export default Register;
