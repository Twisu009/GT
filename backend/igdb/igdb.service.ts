import { createGame } from "@/app/api/game/games.services";
import { getPrismaInstance } from "@/lib/prisma";
import axios, { AxiosResponse } from "axios";

export const getToken = async () => {
  try {
    let igdbDetails = {
      client_id: process.env.IGDB_CLIENT_ID,
      client_secret: process.env.IGDB_CLIENT_SECRET,
      grant_type: process.env.IGDB_GRANT_TYPE,
      tokenUrl: process.env.IGDB_TOKEN_URL,
    };
    console.log(igdbDetails);
    let response: AxiosResponse<{
      access_token: string;
      expires_in: number;
      token_type: string;
    }> = await axios.post(igdbDetails.tokenUrl as string, igdbDetails);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const getGamesWithRating = async (
  token: string,
  ratingRange: { moreThan: number; lessThan: number }
) => {
  try {
    let url = process.env.IGDB_API_URL + "games";
    let response: AxiosResponse<
      {
        id: number;
        cover: number;
        first_release_date: number;
        genres: number[];
        name: string;
        summary: string;
      }[]
    > = await axios.post(
      url,
      `fields name,genres,cover,first_release_date,summary; limit 500; where rating > ${ratingRange.moreThan} & rating < ${ratingRange.lessThan};`,
      {
        headers: {
          "Content-Type": "text/plain",
          "Client-ID": process.env.IGDB_CLIENT_ID,
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
export const getGenres = async (genreIds: number[], token: string) => {
  try {
    let url = process.env.IGDB_API_URL + "genres";
    console.log(genreIds.join());
    let response: AxiosResponse<
      {
        id: number;
        name: string;
      }[]
    > = await axios.post(
      url,
      `fields name,url;where id = (${genreIds.join()});limit 500;`,
      {
        headers: {
          "Content-Type": "text/plain",
          "Client-ID": process.env.IGDB_CLIENT_ID,
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const saveToGenre = async (
  genres: {
    id: number;
    name: string;
  }[]
) => {
  let prisma = getPrismaInstance();
  let genreMapping: {
    igdbId: number;
    localId: number;
  }[] = [];
  for (let genre of genres) {
    let dbGenre = await prisma.genre.findFirst({
      where: {
        GenreName: genre.name,
      },
    });
    if (!dbGenre) {
      dbGenre = await prisma.genre.create({
        data: {
          GenreName: genre.name,
        },
      });
    }
    genreMapping.push({ igdbId: genre.id, localId: dbGenre.GenreID });
  }
  return genreMapping;
};

export const saveToGame = async (
  games: {
    id: number;
    cover: number;
    first_release_date: number;
    genres: number[];
    name: string;
    summary: string;
  }[],
  genreMap: {
    igdbId: number;
    localId: number;
  }[],
  coverMap: {
    id: number;
    url: string;
  }[]
) => {
  let prisma = getPrismaInstance();
  for (let game of games) {
    console.log("game details", game);
    let localCheck = await prisma.game.findFirst({
      where: {
        Title: game.name,
      },
    });
    if (localCheck) continue;
    let genres: number[] = [];
    if ("genres" in game) {
      genres = game.genres
        .map((val) => {
          let localGenre = genreMap.find((v) => val === v.igdbId);
          if (localGenre) return localGenre.localId;
          return 0;
        })
        .filter((f) => f !== 0);
    }
    let mediaUrl = "";
    if ("cover" in game) {
      let mediaDetails = coverMap.find((c) => c.id === game.cover);
      if (mediaDetails) mediaUrl = mediaDetails.url;
    }
    let convertedDto = {
      title: game.name,
      description: game["summary"] ?? "",
      releaseDate: game["first_release_date"]
        ? new Date(game["first_release_date"])
        : new Date(),
      userId: 11,
      genres: genres ?? [],
      mediaUrl: mediaUrl ?? "",
    };
    console.log("dto", convertedDto);

    await createGame(convertedDto);
  }
};

export const getCoverUrl = async (coverIds: number[], token: string) => {
  try {
    let url = process.env.IGDB_API_URL + "covers";
    let response: AxiosResponse<
      {
        id: number;
        url: string;
      }[]
    > = await axios.post(
      url,
      `fields url;where id = (${coverIds.join()});limit 500;`,
      {
        headers: {
          "Content-Type": "text/plain",
          "Client-ID": process.env.IGDB_CLIENT_ID,
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

//the process of fetching game data from the IGDB API, processing it,
//and saving it to the local database
export const importGames = async () => {
  let tokenDetails = await getToken();
  if (tokenDetails) {
    let games = await getGamesWithRating(tokenDetails.access_token, {
      moreThan: 50,
      lessThan: 100,
    });
    if (games) {
      let genreIdsMap: { [key: number]: boolean } = {};
      let coverUrlIds: number[] = [];

      for (let game of games) {
        if ("genres" in game) {
          for (let genre of game.genres) {
            genreIdsMap[genre] = true;
          }
        }
        if (game.cover) coverUrlIds.push(game.cover);
      }
      let genreIds = Object.keys(genreIdsMap).map(Number);
      let genres = await getGenres(genreIds, tokenDetails.access_token);
      let coverUrl = await getCoverUrl(coverUrlIds, tokenDetails.access_token);
      if (genres) {
        let genreMap = await saveToGenre(genres);
        if (coverUrl) await saveToGame(games, genreMap, coverUrl);
      }
    }
  }
};
