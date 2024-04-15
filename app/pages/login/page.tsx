"use client";

import React, { useState } from "react";
import Link from "next/link";
import { InfoModal } from "@/components/ui/info-modal";
import { ErrorModal } from "@/components/ui/error-modal";
import { ZodIssue } from "zod";
import axios, { AxiosResponse } from "axios";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<{
    message: string;
    validationError?: ZodIssue[];
  }>({
    message: "",
  });

  const handleLoginSuccess = () => {
    setIsInfoModalOpen(false); // Close the success modal
    window.location.href = "/"; // Redirect to the home page
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response: AxiosResponse<{
        user: {
          UserID: number;
          Username: string;
          Email: string;
          DateOfBirth: Date;
          token: string;
        };
      }> = await axios.post("/api/auth/login", {
        email: username,
        password: password,
      });
      let data = response.data;
      // save in local storage
      setInfoMessage(`Success, Welcome ${data.user.Username}!`);
      setIsInfoModalOpen(true);
    } catch (error) {
      if (axios.isAxiosError(error))
        if ("error" in error?.response?.data) {
          setErrorMessage({
            message: error?.response?.data.error,
            validationError: error?.response?.data.message,
          });
          setIsErrorModalOpen(true);
        }
    }
  };

  return (
    <div className="min-h-screen bg-custom-blue-green text-white">
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
              className="align-center text-sm font-normal leading-6 text-slate-100"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="bg-transparent w-full border-b border-gray-300 focus:border-indigo-600 px-3.5 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-teal-600 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="align-center text-sm font-normal leading-6 text-slate-100"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-transparent w-full border-b border-gray-300 focus:border-indigo-600 px-3.5 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-teal-600 sm:text-sm"
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
            <u className="hover:text-teal-300">Register now.</u>
          </Link>
        </h1>
      </div>
      <InfoModal
        isOpen={isInfoModalOpen}
        setOpen={setIsInfoModalOpen}
        message={infoMessage}
        onOk={handleLoginSuccess}
      />
      <ErrorModal
        isOpen={isErrorModalOpen}
        setOpen={setIsErrorModalOpen}
        message={errorMessage.message}
        validationError={errorMessage.validationError}
      />
    </div>
  );
};

export default Login;
