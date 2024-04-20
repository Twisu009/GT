"use client";
import { Game, get_user_games } from "@/components/game/game.services";
import LoadingUI from "@/components/loading/Loading";
import { useLoading } from "@/components/loading/LoadingContext";
import { UserDetails, get_users } from "@/components/user/user.services";
import { getUserDetailsInLocalStorage } from "@/utilities/local-storage";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const UserGames = () => {
  const { userId } = useParams();
  const [games, setGames] = useState<Game[]>([]);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(10);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState<UserDetails>();
  const { loading, setLoading } = useLoading();

  useEffect(() => {
    initial();
    getUserDetails();
  }, []);
  const initial = async () => {
    setLoading(true);
    try {
      if (userId) {
        const response = await get_user_games({
          skip,
          count: 10,
          userIds: [+userId],
          value: search,
        });
        setGames(response.results);
        setSkip(0);
        setTotal(response.total);
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };
  const getUserDetails = async () => {
    if (userId) {
      let resp = await get_users({
        skip: 0,
        count: 1,
        userIds: [+userId],
      });
      let us = resp.results.find((u) => u.UserID === +userId);
      if (us) setUser(us);
    }
  };

  const loadMore = async () => {
    setLoading(true);
    try {
      if (userId) {
        const response = await get_user_games({
          skip: skip + 10,
          count: 10,
          userIds: [+userId],
          value: search,
        });
        setSkip(skip + 10);
        setGames((prev) => [...prev, ...response.results]);
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <LoadingUI />
      ) : (
        <>
          <div className="flex flex-col justify-center items-center w-full">
            <div className=" flex justify-center gap-2 items-end mt-10 text-center text-2xl font-bold mb-8">
              <div className="flex w-[150px] border-t-4  border-black my-4"></div>
              <div className="flex gap-2 ">
                <span style={{ color: "#071013" }}>
                  {`${user?.Username.toUpperCase()}'s`}
                </span>
                <span style={{ color: "#6bd3b6" }}>Games</span>
              </div>
              <div className="flex w-[150px] border-t-4  border-black my-4"></div>
            </div>

            <input
              type="text"
              value={search}
              className="px-4 py-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  initial();
                }
              }}
              placeholder="Enter to search..."
            />
            {games.map((g) => {
              return (
                <div
                  key={g.GameID}
                  className="w-2/3 border-b border-gray-200 mb-4 pb-4"
                >
                  <div className="flex items-center mb-2">
                    <Link href={`/pages/game/${g.GameID}`}>
                      <img
                        src={g.ImageUrl}
                        alt={""}
                        width={200}
                        height={300}
                        className=" flex items-center justify-center bg-gray-300 text-gray-600 font-bold"
                      />
                    </Link>
                    <Link
                      href={`/pages/game/${g.GameID}`}
                      className="pl-5 flex flex-col justify-center  w-full"
                    >
                      <div className="text-2xl text-black  flex-grow ">
                        {g.Title}
                      </div>
                      <div className="text-xs text-grey-500 p-4 w-full ">
                        {g.Description.slice(0, 150)}
                        {g.Description.length > 150 ? "..." : ""}
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}
            {total > games.length && (
              <button
                className=" bg-blue-500 text-white p-3 rounded hover:bg-blue-600"
                onClick={loadMore}
              >
                Load More...
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default UserGames;
