"use client";

import ReusableBanner from "@/components/ui/banner";
import { ReusableNewReleases } from "@/components/ui/new-releases";
import { useState } from "react";

// import { useState } from "react";

// const bannerData = [
//   { imageSrc: "/static/images/banner1.jpg", description: "Action" },
//   { imageSrc: "/static/images/banner2.jpg", description: "Adventure" },
//   { imageSrc: "/static/images/banner3.jpg", description: "Puzzle" },
// ];

// export default function Action() {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const nextSlide = () => {
//     setCurrentSlide((prevSlide) =>
//       prevSlide === bannerData.length - 1 ? 0 : prevSlide + 1
//     );
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prevSlide) =>
//       prevSlide === 0 ? bannerData.length - 1 : prevSlide - 1
//     );
//   };

//   return (
//     <main>
//       {/* Banner section */}
//       <div className="relative w-full h-96 bg-teal-500 overflow-hidden">
//         <img
//           src={bannerData[currentSlide].imageSrc}
//           alt="banner"
//           className="w-full h-full object-cover"
//         />
//         <div className="absolute top-0 left-0 flex items-center h-full">
//           <button onClick={prevSlide} className="text-white absolute left-4">
//             Prev
//           </button>
//         </div>
//         <div className="absolute top-0 right-0 flex items-center h-full">
//           <button onClick={nextSlide} className="text-white absolute right-4">
//             Next
//           </button>
//         </div>
//         <div className="absolute bottom-0 left-0 right-0 text-center text-white p-4 bg-black bg-opacity-50">
//           {bannerData[currentSlide].description}
//         </div>
//       </div>
//     </main>
//   );
// }

const bannerData = [
  { imageSrc: "/static/images/banner1.jpg", description: "Action" },
  { imageSrc: "/static/images/banner2.jpg", description: "Adventure" },
  { imageSrc: "/static/images/banner3.jpg", description: "Puzzle" },
];

const Actions = () => {
  const [showAdditionalRow, setShowAdditionalRow] = useState(false);

  const toggleAdditionalRow = () => {
    setShowAdditionalRow(!showAdditionalRow);
  };
  return (
    <main>
      <div>
        {/* Banner section */}
        <ReusableBanner />
      </div>

      {/* Action Cards section */}
      <div>
        <div className="mt-40 mb-8">
          <section title="New Releases">
            <div className="mt-40 text-center text-2xl font-bold mb-8">
              <h1>
                <span style={{ color: "#10242C" }}>Action </span>
                <span style={{ color: "#6bd3b6" }}>Category</span>
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
      </div>
    </main>
  );
};

export default Actions;
