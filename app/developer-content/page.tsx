"use client";

import ReusableBanner from "@/components/ui/banner";
import CommentSection from "@/components/ui/comments";
import DevReusableBanner from "@/components/ui/dev-content-banner";
import { ReusableNewReleases } from "@/components/ui/new-releases";
import Link from "next/link";
import { useState } from "react";
import { FaPlus, FaAngleDown } from "react-icons/fa";

export default function Dcontent() {
  const [showAdditionalRow, setShowAdditionalRow] = useState(false);

  const toggleAdditionalRow = () => {
    setShowAdditionalRow(!showAdditionalRow);
  };
  return (
    <main>
      <div>
        <DevReusableBanner />
      </div>

      {/*Developer's games section*/}
      <div className="mt-40 mb-8">
        <section title="New Releases">
          <div className="mt-40 text-center text-2xl font-bold mb-8">
            <h1>
              <span style={{ color: "#10242C" }}>Developer </span>
              <span style={{ color: "#6bd3b6" }}>Contents</span>
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
            <Link href={"/developer-content/update-page"}>
              <button className="bg-transparent text-teal-700 font-semibold py-2 px-4 border border-teal-400 rounded transition-colors duration-300 hover:bg-cyan-950 hover:text-white hover:border-transparent">
                <span style={{ color: "#6bd3b6" }}>Update</span>
              </button>
            </Link>

            <div className="ml-5">
              <Link href="/developer-content/Showcase">
                <button className="bg-transparent text-teal-700 font-semibold py-2 px-4 border border-teal-400 rounded transition-colors duration-300 hover:bg-cyan-950 hover:text-white hover:border-transparent flex items-center">
                  <FaPlus style={{ color: "#6bd3b6", fontSize: "1.5rem" }} />
                  <span style={{ color: "#6bd3b6" }}></span>
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>
      {/* <div className="ml-5">
        <button
          className="bg-transparent text-teal-700 font-semibold py-2 px-4 border border-teal-400 rounded transition-colors duration-300 hover:bg-cyan-950 hover:text-white hover:border-transparent flex items-center"
          onClick={toggleAdditionalRow}
        >
          <FaAngleDown style={{ color: "#6bd3b6", fontSize: "1.5rem" }} />
          <span style={{ color: "#6bd3b6" }}></span>
        </button>
      </div> */}
    </main>
  );
}
