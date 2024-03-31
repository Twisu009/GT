//This file wraps any page component in the app

import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";

// Components
import Navbar from "../components/nav-bar";
import Footer from "../components/footer";
import Header from "../components/header";
// import Login from "./login";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={rubik.className}>
        <Header />
        {/* <Login /> */}
        <Navbar />
        <div className="container"></div>
        {children}
      </body>
    </html>
  );
}
