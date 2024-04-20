import React, { useEffect, useState } from "react";
import { ReusableNewReleases } from "../ui/new-releases";
import Link from "next/link";
import { Game, get_latest_games } from "../game/game.services";
import { useLoading } from "../loading/LoadingContext";
import LoadingUI from "../loading/Loading";

const NewReleases = () => {
  let [games, setGames] = useState<Game[]>();
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    getGames();
  }, []);
  const getGames = async () => {
    try {
      setLoading(true);
      let response = await get_latest_games();
      setGames(response.results);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mt-40 mb-8">
      <section title="New Releases">
        <div className=" flex justify-center gap-2 items-end mt-40 text-center text-2xl font-bold mb-8">
          <div className="flex w-[150px] border-t-4  border-black my-4"></div>
          <div className="flex gap-2 ">
            <span style={{ color: "#071013" }}>New </span>
            <span style={{ color: "#6bd3b6" }}>Releases</span>
          </div>
          <div className="flex w-[150px] border-t-4  border-black my-4"></div>
        </div>
        {loading ? (
          <LoadingUI />
        ) : (
          <>
            <div className="flex flex-wrap justify-center">
              {games?.slice(0, 8).map((g) => {
                return (
                  <ReusableNewReleases
                    NewReleasescardLink={`/pages/game/${g.GameID}`}
                    text={g.Title}
                    imageSrc={g.ImageUrl}
                  />
                );
              })}
            </div>
            <div className="mt-10 flex justify-center">
              <Link href="/pages/genre">
                <button className="bg-transparent text-custom-blue-green font-semibold py-2 px-4 border border-custom-teal rounded transition-colors duration-300 hover:bg-custom-blue-green hover:text-white hover:border-transparent">
                  <span style={{ color: "#071013" }}>See </span>
                  <span style={{ color: "#6bd3b6" }}>All</span>
                </button>
              </Link>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default NewReleases;
