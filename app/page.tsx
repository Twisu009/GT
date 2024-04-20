"use client";

import Link from "next/link";
import developer from "../public/static/images/developer.png";
import ReusableBanner from "@/components/ui/banner-main";
import NewReleases from "@/components/new-releases/new-releases";
import axios from "axios";

import HomeGenre from "@/components/genre/home-genre";

export default function Home() {
  return (
    <main>
      {/*----Banner section----*/}
      <div className="w-full h-96 bg-banner-bg bg-center">
        <div className="relative banner w-full h-96">
          <ReusableBanner />
          <div className="absolute top-1/2 right-4 transform -translate-y-1/2 text-right">
            <h2 className="text-3xl font-bold text-slate-300 mb-2">
              Discover, Play, Repeat
            </h2>
            <p className="text-lg text-gray-400 mb-4">
              Your Game Oasis - Welcome to G-Trove
            </p>

            <Link href="/pages/AboutUs">
              <button className="bg-custom-blue-green text-slate-100 font-semibold py-2 px-4 border border-custom-blue-green rounded transition-colors duration-300 hover:bg-transparent hover:text-custom-teal hover:border-transparent">
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </div>
      <br></br>
      <br></br>
      {/*Genre section*/}
      <HomeGenre />

      {/*New Releases section*/}
      <NewReleases />

      {/*Developer content section*/}
      <div>
        <section title="Developer Contents">
          <div className="flex flex-col  md:flex-row justify-center mt-20 ">
            {/* Developer Image */}
            <div className="flex flex-1 ml-20 justify-center md:justify-end  ">
              <img
                src={developer.src}
                alt="Developer Image"
                className="h-[700px] w-[720px]"
              />
            </div>
            {/* Text and Button */}
            <div className="mb-10 flex-1 flex flex-col justify-center">
              <div className="flex gap-2 items-end text-left text-2xl font-bold mb-4">
                <div className="flex">
                  <span style={{ color: "#071013", marginRight: 2 }}>Our </span>
                  <span style={{ color: "#6bd3b6" }}>Developers</span>
                </div>
                <div className="flex  border-t-4  ml-10 w-[150px] border-black "></div>
              </div>
              <p className="text-left mb-8">
                "Discover what's new! Dive into the latest creations from our
                developers. Visit now for an exciting experience!"
              </p>
              <div className="flex justify-left">
                <Link href="/pages/developer-content">
                  <button className="bg-custom-blue-green text-slate-100 font-semibold py-2 px-4 border rounded transition-colors duration-300 hover:bg-transparent hover:text-custom-blue-green hover:border-custom-teal">
                    Visit
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
