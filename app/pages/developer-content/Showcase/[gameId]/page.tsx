"use client";

import React, { useEffect, useMemo, useState } from "react";
import ReusableUploadForm from "@/components/ui/upload-form";
import { NextPage } from "next";
import { getUserDetailsInLocalStorage } from "../../../../../utilities/local-storage";
import { useParams } from "next/navigation";
import { get_game_by_id } from "@/components/game/game.services";
import { patchRequest } from "@/utilities/https";
import {
  LoadingProvider,
  useLoading,
} from "@/components/loading/LoadingContext";
import LoadingUI from "@/components/loading/Loading";
import { get_all_genres } from "@/components/genre/genre.services";
import { FaCheckCircle } from "react-icons/fa";

const ShowcaseUpdate: NextPage = () => {
  const { gameId } = useParams();
  const userDetails = getUserDetailsInLocalStorage();
  const [uploaded, setUploaded] = useState(false);
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    releaseDate: string;
    mediaUrl: string;
    genres: number[];
    genreList: any[];
  }>({
    title: "",
    description: "",
    releaseDate: "2024-03-03",

    mediaUrl: "",
    genres: [],
    genreList: [],
  });
  const [isLogin, setIsLogin] = useState(false);
  const { loading, setLoading } = useLoading();

  useEffect(() => {
    if (userDetails) setIsLogin(true);
    initial();
  }, []);

  const initial = async () => {
    setLoading(true);
    if (gameId && userDetails) {
      let resp = await get_game_by_id(+gameId);
      let genreList = await get_all_genres();
      if (resp.UserID === userDetails.UserID) {
        setFormData({
          title: resp.Title,
          description: resp.Description,
          releaseDate: resp.ReleaseDate,
          mediaUrl: resp.ImageUrl,
          genres: resp.GameGenre.map((val) => val.GenreID),
          genreList: genreList.results,
        });
      }
    }
    setLoading(false);
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await patchRequest(
        "/api/game/protected/" + gameId,
        formData
      );
      setUploaded(true);
    } catch (error) {
      console.error("Error uploading content:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-3xl mx-auto p-6">
      {loading ? (
        <LoadingUI />
      ) : (
        <>
          {isLogin ? (
            <>
              <h1 className="flex justify-center text-3xl font-semibold mb-6 mt-40">
                Game Update
              </h1>

              {!uploaded ? (
                <ReusableUploadForm
                  title={formData.title}
                  description={formData.description}
                  releaseDate={formData.releaseDate}
                  mediaUrl={formData.mediaUrl}
                  onInputChange={handleInputChange}
                  genres={formData.genres}
                  genreList={formData.genreList}
                  onSubmit={handleSubmit}
                />
              ) : (
                <div className="flex justify-center mt-6 text-2xl font-semibold">
                  {" "}
                  Successful!
                  <FaCheckCircle className="text-green-500 text-4xl mr-2 ml-6 text-3xl" />
                </div>
              )}
            </>
          ) : (
            <div className="flex justify-center">
              Please login to update your games!
            </div>
          )}
        </>
      )}
    </main>
  );
};

export default ShowcaseUpdate;
