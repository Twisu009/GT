"use client";
import GameComments from "@/components/comment/comments";
import { Game, get_game_by_id } from "@/components/game/game.services";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { id } = useParams();
  const [game, setGame] = useState<Game>();

  useEffect(() => {
    getGameDetails();
  }, []);
  const getGameDetails = async () => {
    let response = await get_game_by_id(+id);
    setGame(response);
  };

  return (
    <div>
      <div>{game?.Title}</div>
      <div>{game?.Description}</div>
      <div>{game?.ImageUrl}</div>
      <div>{game?.ReleaseDate}</div>
      <div>{game?.UserID}</div>
      <div>
        Genres:
        {game?.GameGenre.map((genre) => {
          return <span key={genre.GenreID}> {genre.genre.GenreName}, </span>;
        })}
      </div>
      <GameComments gameId={+id} />
    </div>
  );
}
