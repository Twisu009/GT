"use client";

import "./style.css";
import BackgroundImage from "@/components/ui/background-image";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { ReusableCardTwo } from "@/components/ui/reusableCard";
import { getRequest } from "@/utilities/https";
import Link from "next/link";
import LoadingUI from "@/components/loading/Loading";
import { useLoading } from "@/components/loading/LoadingContext";
import { Game, get_games_by_genre_id } from "@/components/game/game.services";
import { get_genre_by_id } from "@/components/genre/genre.services";

export default function GenreTemplate({ params }: { params: { id: number } }) {
  const [gamesList, setGamesList] = useState<Game[]>([]);
  const [genre, setGenre] = useState<{
    GenreID: number;
    GenreName: string;
    ImageUrl: string | null;
  }>();
  const [showAdditionalRow, setShowAdditionalRow] = useState(false);
  const { loading, setLoading } = useLoading();
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(10);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getGenre();
    callGamesAPI();
  }, []);

  const getGenre = async () => {
    try {
      let genre = await get_genre_by_id(+params.id);
      setGenre(genre.genre);
    } catch (e) {
    } finally {
    }
  };

  const callGamesAPI = async () => {
    try {
      setLoading(true);
      let gamesData = await get_games_by_genre_id({
        genreIds: [+params.id],
        skip: 0,
        count: 10,
        value: search,
      });
      setGamesList(gamesData.results);
      setSkip(0);
      setTotal(gamesData.total);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };
  const loadMore = async () => {
    setLoading(true);
    try {
      const response = await get_games_by_genre_id({
        skip: skip + 10,
        count: 10,
        genreIds: [+params.id],
        value: search,
      });
      setSkip(skip + 10);
      setGamesList((prev) => [...prev, ...response.results]);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="game-list-wrapper overflow-y-auto">
      {loading ? (
        <LoadingUI />
      ) : (
        <div className="flex flex-col justify-center items-center w-full">
          <div className="text-3xl p-4 text-black mb-10 ">
            {genre?.GenreName}
          </div>

          <input
            type="text"
            value={search}
            className="px-4 py-2 mb-10 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                callGamesAPI();
              }
            }}
            placeholder="Enter to search..."
          />
          <br></br>
          <div className="flex justify-center flex-wrap overflow-hidden h-dvh mb-10">
            {gamesList &&
              gamesList.map((data) => (
                <Link href={`/pages/game/${data.GameID}`} key={data.Title}>
                  <ReusableCardTwo
                    NewReleasescardLink="/developer-content"
                    text={data.Title}
                    imageSrc={data.ImageUrl}
                  />
                </Link>
              ))}
          </div>
          <br></br>
          {total > gamesList.length && (
            <button
              className="bg-transparent text-custom-blue-green font-semibold py-2 px-4 border rounded transition-colors duration-300 hover:text-custom-teal hover:border-custom-blue-green flex items-center"
              onClick={loadMore}
            >
              Load more...
            </button>
          )}
        </div>
      )}
    </main>
  );
}
