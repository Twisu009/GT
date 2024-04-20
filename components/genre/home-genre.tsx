"use client";
import { useEffect, useState } from "react";
import { Genre } from "@/components/game/game.services";
import { get_all_genres } from "./genre.services";
import Link from "next/link";
import { ReusableCard } from "../ui/card";
import LoadingUI from "../loading/Loading";
import { useLoading } from "../loading/LoadingContext";
const HomeGenre = () => {
  const [genreList, setGenreList] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetching genres from the API
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        setLoading(true);
        const response = await get_all_genres();
        setGenreList(response.results); // Fetches only 5 genres
      } catch (error) {
        console.error("Error fetching genres:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGenres();
  }, []);
  return (
    <div className="flex ml-16 flex-wrap md:flex-nowrap ml-20">
      {/* Text and Button */}
      <div className="flex flex-col justify-left ml-64">
        <div className="flex justify-end items-end mb-8 text-2xl font-bold">
          <div>
            <span style={{ color: "#071013" }}>Best </span>
            <br></br>

            <span style={{ color: "#6bd3b6" }}>Genres</span>
          </div>
          <div className="flex w-full border-t-4  ml-32  w-[200px] border-black "></div>
        </div>
        <p>"Browse the best collection of games our users like"</p>

        {/* Button */}
        <div className="flex ml-80 ">
          <Link
            href="/pages/genre"
            className=" flex justify-end items-end mt-4 font-bold btn-genres rounded-lg "
          >
            <span style={{ color: "#6bd3b6", paddingRight: 2 }}>See </span>
            <span style={{ color: "#071013" }}>All</span>
          </Link>
        </div>
      </div>
      {loading ? (
        <LoadingUI />
      ) : (
        <div className="flex overflow-x-auto overflow-y-hidden ml-10 scrollbar-hide">
          {/* Mapping through fetched genres */}
          {genreList?.slice(0, 10).map((genre) => (
            <Link key={genre.GenreID} href={`/pages/genre/${genre.GenreID}`}>
              <ReusableCard
                cardLink={`/pages/genre/${genre.GenreID}`}
                text={genre.GenreName}
                imageSrc={genre.ImageUrl}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeGenre;
