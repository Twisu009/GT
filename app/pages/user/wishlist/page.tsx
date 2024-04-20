"use client";
import LoadingUI from "@/components/loading/Loading";
import { useLoading } from "@/components/loading/LoadingContext";
import { ReusableSearchFilter } from "@/components/ui/reusable-search-filter";
import {
  Wishlists,
  get_user_wishlist,
  remove_user_wishlist,
} from "@/components/user/wishlist.services";
import { getUserDetailsInLocalStorage } from "@/utilities/local-storage";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const UserWishlist = () => {
  const userDetails = getUserDetailsInLocalStorage();
  const [wishlist, setWishlist] = useState<Wishlists[]>([]);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(10);
  const [isLogin, setIsLogin] = useState(false);
  const [search, setSearch] = useState("");
  const { loading, setLoading } = useLoading();

  useEffect(() => {
    if (userDetails) setIsLogin(true);
    initial();
  }, []);

  const initial = async () => {
    setLoading(true);
    try {
      if (userDetails) {
        const response = await get_user_wishlist({
          skip,
          count: 10,
          userId: userDetails.UserID,
          value: search,
        });
        setWishlist(response.results);
        setSkip(0);
        setTotal(response.total);
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    setLoading(true);
    try {
      if (userDetails) {
        const response = await get_user_wishlist({
          skip: skip + 10,
          count: 10,
          userId: userDetails.UserID,
          value: search,
        });
        setSkip(skip + 10);
        setWishlist((prev) => [...prev, ...response.results]);
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  const removeWishlist = async (wishlistId: number) => {
    setLoading(true);
    try {
      await remove_user_wishlist(wishlistId);
      setSearch("");
      await initial();
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
          {isLogin ? (
            <div className="flex flex-col justify-center items-center w-full">
              <div className=" flex justify-center gap-2 items-end mt-10 text-center text-2xl font-bold mb-8">
                <div className="flex w-[150px] border-t-4  border-black my-4"></div>
                <div className="flex gap-2 ">
                  <span style={{ color: "#071013" }}>My </span>
                  <span style={{ color: "#6bd3b6" }}>Wishlist</span>
                </div>
                <div className="flex w-[150px] border-t-4  border-black my-4"></div>
              </div>

              {/* search */}
              <div className="flex items-center justify-center mt-10 mb-20">
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
                {/* <div className="ml-10">
                  {" "}
                  <ReusableSearchFilter />
                </div> */}
              </div>

              {wishlist.map((w) => {
                return (
                  <div
                    key={w.WishlistID}
                    className="w-2/3 border-b border-gray-200 mb-4 pb-4"
                  >
                    <div className="flex items-center mb-2">
                      <Link href={`/pages/game/${w.game.GameID}`}>
                        <img
                          src={w.game.ImageUrl}
                          alt={""}
                          width={200}
                          height={300}
                          className=" flex items-center justify-center bg-gray-300 text-gray-600 font-bold"
                        />
                      </Link>
                      <Link
                        href={`/pages/game/${w.game.GameID}`}
                        className="pl-5 flex flex-col justify-center  w-full"
                      >
                        <div className="text-2xl text-black  flex-grow ">
                          {w.game.Title}
                        </div>
                        <div className="text-xs text-grey-500 p-4 w-full ">
                          {w.game.Description.slice(0, 150)}
                          {w.game.Description.length > 150 ? "..." : ""}
                        </div>
                      </Link>
                      <div className="flex justify-end text-red-600">
                        <button
                          onClick={() => {
                            removeWishlist(w.WishlistID);
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
              {total > wishlist.length && (
                <button
                  className=" bg-blue-500 text-white p-3 rounded hover:bg-blue-600"
                  onClick={loadMore}
                >
                  Load More...
                </button>
              )}
            </div>
          ) : (
            <div>Please login to see your wishlists!</div>
          )}
        </>
      )}
    </div>
  );
};

export default UserWishlist;
