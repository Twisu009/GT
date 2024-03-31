"use client";

import React, { useState } from "react";
import Link from "next/link";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("username:", username);
    console.log("password:", password);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: username,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Login successful. Token:", data.token);
    } catch (error) {
      console.error("There was a problem with the login:", error);
    }
  };

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
        <h1>User Login</h1>
      </div>
      <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="block w-full border-full border-b border-gray-300 focus:border-indigo-600 px-3.5 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-600 sm:text-sm"
            />
          </div>
        </div>

        <button
          type="submit"
          className="block mx-auto w-24 mt-8 px-3.5 py-2.5 text-center text-sm font-semibold text-black rounded-md shadow-sm hover:bg-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600"
          style={{ backgroundColor: "#6BD3C6" }}
        >
          Login
        </button>
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
          <Link href="/pages/register">
            <a>
              <u>Register now.</u>
            </a>
          </Link>
        </h1>
      </div>
    </div>
  );
};

export default Login;
