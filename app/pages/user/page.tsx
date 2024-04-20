"use client";
import LoadingUI from "@/components/loading/Loading";
import { useLoading } from "@/components/loading/LoadingContext";
import {
  UserDetails,
  get_all_users,
  get_users,
} from "@/components/user/user.services";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const UsersPage = () => {
  const [users, setUsers] = useState<UserDetails[]>([]);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(10);
  const [search, setSearch] = useState("");
  const { loading, setLoading } = useLoading();
  useEffect(() => {
    initial();
  }, []);

  const initial = async () => {
    setLoading(true);
    try {
      let response = await get_all_users({
        skip: 0,
        count: 10,
        value: search,
      });
      setUsers(response.results);
      setSkip(0);
      setTotal(response.total);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    setLoading(true);
    try {
      const response = await get_all_users({
        skip: skip + 10,
        count: 10,
        value: search,
      });
      setSkip(skip + 10);
      setUsers((prev) => [...prev, ...response.results]);
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
                <span style={{ color: "#071013" }}>Developer </span>
                <span style={{ color: "#6bd3b6" }}>List</span>
              </div>
              <div className="flex w-[150px] border-t-4  border-black my-4"></div>
            </div>

            <input
              type="text"
              value={search}
              className="px-4 py-2 mb-8 mt-10 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  initial();
                }
              }}
              placeholder="Enter to search..."
            />
            <br></br>
            <div className="flex items-center justify-center">
              <Link href="/pages/developer-content/Showcase">
                <button className="text-custom-blue-green px-4 border border-custom-teal rounded transition-colors duration-300 hover:bg-transparent hover:text-custom-teal hover:border-transparent mr-4">
                  <span>Add Your Games</span>
                </button>
              </Link>

              <Link href="/pages/user/games">
                <button className="text-custom-blue-green px-4 border border-custom-teal rounded transition-colors duration-300 hover:bg-transparent hover:text-custom-teal hover:border-transparent ml-4">
                  <span>View or Update Your Games</span>
                </button>
              </Link>
            </div>
            <br></br>
            {users.map((g, index) => {
              return (
                <div
                  key={g.UserID}
                  className="w-2/3 border-b border-gray-200 mb-4 pb-4"
                >
                  <div className="flex items-center mb-2">
                    <Link href={`/pages/user/games/${g.UserID}`}>
                      <div className="flex-shrink-0">
                        <div className="h-8 w-8 flex items-center justify-center bg-gray-300 rounded-full text-gray-600 font-bold">
                          {index + 1}
                        </div>
                      </div>
                    </Link>
                    <Link
                      href={`/pages/user/games/${g.UserID}`}
                      className="pl-5 flex flex-col justify-center  w-full"
                    >
                      <div className="text-xl text-black  flex-grow ">
                        {g.Username}
                      </div>
                      <div className="text-xs text-grey-500  w-full ">
                        {g.Email}
                      </div>
                    </Link>
                    <div className="flex justify-end ">
                      <Link
                        href={`/pages/user/games/${g.UserID}`}
                        className="pl-5 flex flex-col justify-center  w-full"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
            {total > users.length && (
              <button
                className="mb-6 mt-8 bg-transparent text-custom-blue-green font-semibold py-2 px-4 border rounded transition-colors duration-300 hover:text-custom-teal hover:border-custom-blue-green flex items-center"
                onClick={loadMore}
              >
                Load More...
              </button>
            )}
          </div>
          <br></br>
        </>
      )}
    </div>
  );
};

export default UsersPage;
