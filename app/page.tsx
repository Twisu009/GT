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
import { ReusableDeveloperContent } from "@/components/ui/developerContent";
import { ReusableNewReleases } from "@/components/ui/new-releases";
import { useState } from "react";

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
          <Image
            src={"/static/images/banner.jpg"}
            alt="banner"
            layout="fill"
            objectFit="cover"
            className="full"
          />
          <div className="absolute top-1/2 right-4 transform -translate-y-1/2 text-right">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Discover, Play, Repeat
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              Your Game Oasis - Welcome to G-Trove
            </p>
            <Link href="/pages/AboutUs">
              <button className="btn-genres bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark">
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </div>
      <br></br>
      <br></br>

      {/*Genre section*/}
      <div style={{ display: "flex", marginLeft: 340 }}>
        {/* Text and Button */}
        <div className="flex-0 flex flex-col justify-left mr-10">
          <div className="mb-8 text-2xl font-bold">
            <span style={{ color: "#10242C" }}>Best </span>
            <br></br>
            <span style={{ color: "#6bd3b6" }}>Genres</span>
          </div>
          <p>"Browse the best collection of games our users like"</p>

          {/* Button */}
          <div className="flex items-start ml-80">
            <Link href="/pages/genre">
              <button className="mt-4 font-bold btn-genres rounded-lg">
                <span style={{ color: "#6bd3b6" }}>See </span>
                <span style={{ color: "#10242C" }}>All</span>
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
            cardLink="pages/genre/actions"
            text="Actions"
            imageSrc="/static/images/action.jpg"
          />
          <ReusableCard
            cardLink="pages/genre/actions"
            text="Adventure"
            imageSrc="/static/images/adventure.jpg"
          />
          <ReusableCard
            cardLink="pages/genre/actions"
            text="Horror"
            imageSrc="/static/images/horror.jpg"
          />
          <ReusableCard
            cardLink="pages/genre/actions"
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
              <span style={{ color: "#10242C" }}>New </span>
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
              className="bg-transparent text-teal-700 font-semibold py-2 px-4 border border-teal-400 rounded transition-colors duration-300 hover:bg-cyan-950 hover:text-white hover:border-transparent"
              onClick={toggleAdditionalRow}
            >
              <span style={{ color: "#10242C" }}>See </span>
              <span style={{ color: "#6bd3b6" }}>All</span>
            </button>
          </div>
        </section>
      </div>

      {/*Developer content section*/}
      <div>
        <section title="Developer Contents">
          <div className="mt-20 flex h-full border-3 border-red-500">
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
                <span style={{ color: "#10242C" }}>Our </span>
                <span style={{ color: "#6bd3b6" }}>Developers</span>
              </div>
              <p className="text-left mb-8">
                "Discover what's new! Dive into the latest creations from our
                developers. Visit now for an exciting experience!"
              </p>
              <div className="flex justify-left">
                <Link href="/developer-content">
                  <button className="bg-cyan-950 text-slate-100 font-semibold py-2 px-4 border rounded transition-colors duration-300 hover:bg-transparent hover:text-cyan-950 hover:border-teal-400">
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

// export default function Home() {
//   return (
//     <main>
//       {/*----Banner section----*/}
//       <div className="w-full h-96 bg-banner-bg bg-center">
//         <div className="relative banner w-full h-96">
//           <Image
//             src={"/static/images/banner.jpg"}
//             alt="banner"
//             layout="fill"
//             objectFit="cover"
//             className="rounded-lg"
//           />
//           <div className="absolute top-1/2 right-4 transform -translate-y-1/2 text-right">
//             <h2 className="text-3xl font-bold text-gray-800 mb-2">
//               Discover, Play, Repeat
//             </h2>
//             <p className="text-lg text-gray-600 mb-4">
//               Your Game Oasis - Welcome to G-Trove
//             </p>
//             <Link href="/pages/AboutUs">
//               <button className="btn-genres bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark">
//                 Learn More
//               </button>
//             </Link>
//           </div>
//         </div>
//       </div>
//       <br></br>
//       <br></br>
//       {/* ----Genre section----*/}
//       <div className="flex flex-col md:flex-row justify-center">
//         {/* Left side content */}
//         <div className="md:w-1/3 pl-150 ml-20 bg-red-500">
//           {/* Title */}
//           <div className="flex items-center">
//             <span className="text-black-500 text-2xl font-bold">Best</span>
//           </div>

//           <div className="flex items-center mt-1">
//             <span className="text-gray-700 text-2xl font-bold ml-2">
//               Genres
//             </span>
//             <hr className="border-t border-gray-300 w-1/3 my-2" />
//           </div>
//           {/* Description */}
//           <p className="text-gray-500 mt-4">
//             Browse the best collection of games our users like
//           </p>
//           {/* Button */}
//           <div className="flex items-center mt-4">
//             <Link href="/">
//               {/* This page won't take anywhere, it will show a popup */}
//               <button className="btn-genres rounded-lg bg-blue-500 text-white py-2 px-4">
//                 See All
//               </button>
//             </Link>
//           </div>
//         </div>

//         {/* Right side content */}
//         <div className=" md:w-2/3 p-1">
//           {/* Title */}
//           <h2 className="text-2xl font-bold"></h2>
//           {/* Container for game cards */}
//           <Carousel className="w-full max-w-xl">
//             <CarouselContent>
//               {Array.from({ length: 5 }).map((_, index) => (
//                 <CarouselItem className="basis-1/4" key={index}>
//                   <div className="p-1">
//                     <Card>
//                       <CardContent className="flex aspect-square items-center justify-center p-6">
//                         <span className="text-3xl font-semibold">
//                           {index + 1}
//                         </span>
//                       </CardContent>
//                     </Card>
//                   </div>
//                 </CarouselItem>
//               ))}
//             </CarouselContent>
//             <CarouselPrevious />
//             <CarouselNext />
//           </Carousel>
//         </div>
//       </div>
//       <br></br>
//       <br></br>
//       {/*----Dcontent section----*/}
//       <h2>New Releases</h2>
//       <div className="Dcontent-addWork">
//         <Link href="/pages/AboutUs">
//           <button className="btn-newReleases rounded-lg ">See All</button>
//         </Link>
//       </div>
//       <br></br>
//       <br></br>
//       <h2> Our Developers</h2>
//       <p>
//         "Discover what`&apos;` new! Dive into the latest creations from our
//         developers. Visit now for an exciting experience!"
//       </p>
//       <div className="Dcontent">
//         <Link href="/developer-content">
//           <button className="btn-primary rounded-lg ">Visit</button>
//         </Link>
//       </div>
//     </main>
//   );
// }
