"use client";

import Link from "next/link";
import Image from "next/image";
// import banner from '../public/static/images/banner.jpg'
import developer from "../public/static/images/developer.png";
import { Montserrat } from "next/font/google";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ReusableCard } from "@/components/ui/card";
import { ReusableDeveloperContent } from "@/components/ui/developer-content";
import { ReusableNewReleases } from "@/components/ui/new-releases";
import { useState } from "react";
import { Link2Off } from "lucide-react";
import ReusableBanner from "@/components/ui/banner-main";

//currently working
export default function Home() {
  const [showAdditionalRow, setShowAdditionalRow] = useState(false);

  const toggleAdditionalRow = () => {
    setShowAdditionalRow(!showAdditionalRow);
  };
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
          {/* <button className="bg-cyan-950 text-slate-100 font-semibold py-2 px-4 border border-teal-950 rounded transition-colors duration-300 hover:bg-transparent hover:text-teal-300 hover:border-transparent">
            Learn More
          </button> */}
        </div>
      </div>
      <br></br>
      <br></br>

      {/*Genre section*/}
      <div style={{ display: "flex", marginLeft: 340 }}>
        {/* Text and Button */}
        <div className="flex-0 flex flex-col justify-left mr-10">
          <div className="mb-8 text-2xl font-bold">
            <span style={{ color: "#071013" }}>Best </span>
            <br></br>
            <span style={{ color: "#6bd3b6" }}>Genres</span>
          </div>
          <p>"Browse the best collection of games our users like"</p>

          {/* Button */}
          <div className="flex items-start ml-80">
            <Link href="/pages/genre">
              <button className="mt-4 font-bold btn-genres rounded-lg">
                <span style={{ color: "#6bd3b6" }}>See </span>
                <span style={{ color: "#071013" }}>All</span>
              </button>
            </Link>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            overflow: "scroll",
            flex: 2,
            marginLeft: 10,
          }}
        >
          <ReusableCard
            cardLink="pages/genre/action"
            text="Actions"
            imageSrc="/static/images/action.jpg"
          />
          <ReusableCard
            cardLink="pages/genre/adventure"
            text="Adventure"
            imageSrc="/static/images/adventure.jpg"
          />
          <ReusableCard
            cardLink="pages/genre/horror"
            text="Horror"
            imageSrc="/static/images/horror.jpg"
          />
          <ReusableCard
            cardLink="/pages/genre/multiplayer"
            text="Multi Player"
            imageSrc="/static/images/multi.jpg"
          />
        </div>
      </div>

      {/*New Releases section*/}
      <div className="mt-40 mb-8">
        <section title="New Releases">
          <div className="mt-40 text-center text-2xl font-bold mb-8">
            <h1>
              <span style={{ color: "#071013" }}>New </span>
              <span style={{ color: "#6bd3b6" }}>Releases</span>
            </h1>
          </div>
          <div className="flex justify-center">
            <ReusableNewReleases
              NewReleasescardLink="/developer-content"
              text="Actions"
              imageSrc="/static/images/banner.jpg"
            />
            <ReusableNewReleases />
            <ReusableNewReleases />
            <ReusableNewReleases />
          </div>
          <div className="flex justify-center">
            <ReusableNewReleases />
            <ReusableNewReleases />
            <ReusableNewReleases />
            <ReusableNewReleases />
          </div>
          {/* Additional row */}
          {showAdditionalRow && (
            <div className="flex justify-center">
              <ReusableNewReleases />
              <ReusableNewReleases />
              <ReusableNewReleases />
              <ReusableNewReleases />
            </div>
          )}
          {/* Button to toggle additional row */}
          <div className="mt-10 flex justify-center">
            <button
              className="bg-transparent text-custom-blue-green font-semibold py-2 px-4 border border-custom-teal rounded transition-colors duration-300 hover:bg-custom-blue-green hover:text-white hover:border-transparent"
              onClick={toggleAdditionalRow}
            >
              <span style={{ color: "#071013" }}>See </span>
              <span style={{ color: "#6bd3b6" }}>All</span>
            </button>
          </div>
        </section>
      </div>

      {/*Developer content section*/}
      <div>
        <section title="Developer Contents">
          <div className="mt-20 flex h-full">
            {/* Developer Image */}
            <div className="ml-60 flex-1">
              <img
                src={developer.src}
                alt="Developer Image"
                className="h-full w-auto"
              />
            </div>
            {/* Text and Button */}
            <div className="mb-10 flex-1 flex flex-col justify-center">
              <div className="text-left text-2xl font-bold mb-4">
                <span style={{ color: "#071013" }}>Our </span>
                <span style={{ color: "#6bd3b6" }}>Developers</span>
              </div>
              <p className="text-left mb-8">
                "Discover what's new! Dive into the latest creations from our
                developers. Visit now for an exciting experience!"
              </p>
              <div className="flex justify-left">
                <Link href="/developer-content">
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
