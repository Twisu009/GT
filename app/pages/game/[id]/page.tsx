"use client";
import GameComments from "@/components/comment/comments";
import { Game, get_game_by_id } from "@/components/game/game.services";
import LoadingUI from "@/components/loading/Loading";
import { useLoading } from "@/components/loading/LoadingContext";
import { UserDetails, get_users } from "@/components/user/user.services";
import { getRequest, postRequest } from "@/utilities/https";
import { getUserDetailsInLocalStorage } from "@/utilities/local-storage";
import { Rating, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface GameDetailsType extends Game {
  user?: UserDetails;
}

interface Params {
  [key: string]: string;
}

export default function Page() {
  const { id } = useParams<Params>();
  const parsedId = parseInt(id, 10);
  const [game, setGame] = useState<GameDetailsType>();
  const { loading, setLoading } = useLoading();
  const [wishlist, setWishlist] = useState({
    isWishlist: false,
    wishlistId: 0,
  });
  const [rating, setRating] = useState({
    user: 0,
    total: 0,
    hadRated: true,
  });
  const userDetails = getUserDetailsInLocalStorage();

  useEffect(() => {
    callInitialAPIs();
  }, []);

  const callInitialAPIs = async () => {
    setLoading(true);
    try {
      await Promise.all([
        getGameDetails(),
        getUserRatings(),
        getUserWishlist(),
      ]);
    } catch (error) {
      console.error(
        "ERROR: Error in callInitialAPIs() ||| Location: pages/game/[id]/page.tsx"
      );
    }
    setLoading(false);
  };

  const getGameDetails = async () => {
    let response = await get_game_by_id(+id);
    let users = await get_users({
      skip: 0,
      count: 1,
      userIds: [response.UserID],
    });
    let user = users.results.find((u) => u.UserID === response.UserID);
    if (user) {
      setGame({
        ...response,
        user,
      });
    } else {
      setGame(response);
    }
  };

  const getGameRatings = async () => {
    try {
      let response = await getRequest<any>(`/api/game/rating?gameIds[]=${id}`);
      const ratingData = response.data.ratings.find(
        (data: { GameID: number }) => data.GameID === +id
      );
      if (ratingData)
        setRating((prev) => {
          return { ...prev, total: ratingData._avg.RatingValue / 2 };
        });
    } catch (error) {
      console.error(
        "ERROR: Not found / Not yet rated ||| Location: pages/game/[id]/page.tsx"
      );
    }
  };

  const getUserWishlist = async () => {
    try {
      setLoading(true);
      let response: any = await getRequest<any>(
        `/api/wishlist/protected?gameIds[]=${id}`
      );

      const wishlistData = response.data.results.find(
        (data: { GameID: number }) => data.GameID === +id
      );

      if (wishlistData)
        setWishlist({
          wishlistId: wishlistData.WishlistID,
          isWishlist: true,
        });
    } catch (error) {
      console.error(
        "ERROR: Not found / Not yet rated ||| Location: pages/game/[id]/page.tsx"
      );
    } finally {
      setLoading(false);
    }
  };

  const getUserRatings = async () => {
    try {
      let response = await getRequest<any>(
        `/api/game/protected/rating?gameId=${id}`
      );
      setRating((prev) => {
        return {
          ...prev,
          hadRated: true,
          user: response.data.rating.RatingValue / 2,
        };
      });
    } catch (error) {
      console.log("HMMMMMMMM");
      setRating((prev) => {
        return {
          ...prev,
          hadRated: false,
        };
      });
      console.error(
        "ERROR: Not found / Not yet rated ||| Location: pages/game/[id]/page.tsx"
      );
    } finally {
      await getGameRatings();
    }
  };

  const handleWishlistCLick = async () => {
    try {
      setLoading(true);
      if (userDetails)
        if (!wishlist.isWishlist) {
          // add
          const response: any = await postRequest("/api/wishlist/protected", {
            gameId: +id,
          });

          setWishlist((prev) => {
            return {
              wishlistId: response.data.wishlist.WishlistID,
              isWishlist: !prev.isWishlist,
            };
          });
        }
        // remove
        else {
          await postRequest("/api/wishlist/protected/remove", {
            gameId: +id,
            wishlistId: wishlist.wishlistId,
          });
          setWishlist((prev) => {
            return { ...prev, isWishlist: !prev.isWishlist };
          });
        }
    } catch (error) {
      console.error(
        "ERROR: handleWishlistCLick() ||| Location: pages/game/[id]/page.tsx"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <LoadingUI />
      ) : (
        <div className="flex px-20 flex-col items-center">
          <div className="max-w-[1200px] flex-col lg:flex-row  sm:flex-col flex m-10 items-center  shadow-[10px_10px_10px_rgba(41,41,41,0.5)] bg-gray-100 rounded-2xl overflow-hidden">
            <img
              className="w-auto h-[400px]"
              style={{ flex: "1" }}
              src={game?.ImageUrl}
              alt="game thumbnail"
            />
            <div
              className="flex gap-5 flex-col text-center px-10 py-5 "
              style={{ flex: "3" }}
            >
              <h1 className="font-medium text-2xl ">{game?.Title}</h1>
              <p className="text-center">{game?.Description}</p>

              <div className="flex py-5 justify-start">
                {/* <div className="w-full border-r-2 bg-yellow-200 border-red-500 flex-col flex justify-center px-5"> */}
                <div className="w-full border-r-2 border-custom-teal  flex-col flex justify-center px-5">
                  <h1 className="font-bold text-right">Stats</h1>
                  <div className="text-right">
                    <label className="font-medium">Released - </label>
                    <label>
                      {new Date(game?.ReleaseDate as string).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        }
                      )}
                    </label>
                    <div>
                      <span className="font-medium">Genres - </span>
                      {game?.GameGenre.map((genre) => {
                        return (
                          <span key={genre.GenreID}>
                            {genre.genre.GenreName},
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
                {/* right */}
                <div className="w-full border-l-2 border-custom-teal flex flex-col justify-center px-2">
                  <h1 className="font-bold text-left">Author</h1>
                  <p className="text-left">{game?.user?.Username}</p>
                  <p className="text-left">{game?.user?.Email}</p>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center gap-3">
                <Typography component="legend">
                  <div className="flex flex-col">
                    <label className="font-bold">Rating </label>
                  </div>
                </Typography>
                <div className="flex w-full gap-3 justify-center items-center">
                  <label> Avg </label>
                  <Rating
                    precision={0.5}
                    readOnly={true}
                    name="simple-controlled"
                    value={rating.total}
                  />
                </div>
                <div className="flex w-full gap-3 justify-center items-center">
                  <label> You </label>
                  <Rating
                    precision={0.5}
                    readOnly={!userDetails || rating.hadRated ? true : false}
                    name="simple-controlled"
                    value={rating.user}
                    onChange={async (event, newValue) => {
                      try {
                        setLoading(true);
                        if (userDetails && !rating.hadRated) {
                          await postRequest("/api/game/protected/rating", {
                            userId: userDetails.UserID,
                            gameId: +id,
                            rating: (newValue as number) * 2,
                          });
                          setRating((prev) => {
                            return {
                              ...prev,
                              user: newValue as number,
                              hadRated: true,
                            };
                          });

                          await getGameRatings();
                        }
                      } catch (error) {
                        console.error(
                          "ERROR: line 310 ma error aayo hai||| Location: pages/game/[id]/page.tsx"
                        );
                      } finally {
                        setLoading(false);
                      }
                    }}
                  />
                </div>
                <div
                  onClick={handleWishlistCLick}
                  className="hover:cursor-pointer"
                >
                  {wishlist.isWishlist ? (
                    <FaHeart
                      className="text-custom-teal text-opacity-100 p-1"
                      style={{ fontSize: "3rem" }}
                    />
                  ) : (
                    <FaRegHeart
                      className="text-custom-blue-green text-opacity-100 hover:text-custom-teal p-1"
                      style={{ fontSize: "3rem" }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <GameComments gameId={+id} />
        </div>
      )}
    </>
  );
}
