"use client";

import "./style.css";
import BackgroundImage from "@/components/ui/background-image";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { ReusableCardTwo } from "@/components/ui/reusableCard";
import { getRequest } from "@/utilities/https";

export default function GenreTemplate({ params }: { params: { id: number } }) {
    const [gamesList, setgamesList] = useState([
        {
            GameID: 568,
            Title: "Neko Atsume: Kitty Collector",
            Description:
                "Attract cats with food and then watch them romp with your toys! More than 40 varieties of cats—white and black, tabby and calico—might stop by. Rare cats are rumored to roam the neighborhood too, but you'll need particular items to entice those elusive felines. Each visitor is logged in your Catbook. Become a master kitty collector and fill it up!",
            ReleaseDate: "1970-01-17T08:42:43.200Z",
            ImageUrl: "//images.igdb.com/igdb/image/upload/t_thumb/co1o8i.jpg",
            UserID: 11,
            GameGenre: [],
        },
    ]);
    const [showAdditionalRow, setShowAdditionalRow] = useState(false);

    const toggleAdditionalRow = () => {
        setShowAdditionalRow(!showAdditionalRow);
    };

    useEffect(() => {
        callGamesAPI();
    }, []);

    const callGamesAPI = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        };

        let gamesData: AxiosResponse<any> = await getRequest(
            `/api/game/?genreIds[]=${params.id}`
        );
        setgamesList(gamesData.data.results);
    };

    console.log(gamesList);

    return (
        <main className="game-list-wrapper overflow-y-auto">
            <div>
                <BackgroundImage
                    imageUrl={"/static/images/bwBanner.jpg"}
                    text="Action"
                />
            </div>

            <div className="flex justify-center flex-wrap overflow-hidden h-dvh">
                {gamesList &&
                    gamesList.map((data) => (
                        <ReusableCardTwo
                            key={data.Title}
                            NewReleasescardLink="/developer-content"
                            text={data.Title}
                            imageSrc={data.ImageUrl}
                        />
                    ))}
            </div>
        </main>
    );
}
