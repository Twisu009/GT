"use client";

import React, { useEffect, useState } from "react";
import ReusableSpinner from "@/components/ui/spinner";
import ReusableUploadForm from "@/components/ui/upload-form";
import { NextPage } from "next";
import { getUserDetailsInLocalStorage } from "../../../../utilities/local-storage";
import { postRequest } from "@/utilities/https";
import { get_all_genres } from "@/components/genre/genre.services";
import { useLoading } from "@/components/loading/LoadingContext";
import LoadingUI from "@/components/loading/Loading";
import { FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";

const Showcase: NextPage = () => {
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
    releaseDate: "",
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
    let genreList = await get_all_genres();
    setFormData({
      title: "",
      description: "",
      releaseDate: "2024-03-03",
      mediaUrl: "",
      genres: [],
      genreList: genreList.results,
    });
    setLoading(false);
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await postRequest<any>("/api/game/protected", formData);
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
              <h1 className="flex justify-center text-3xl font-semibold mb-12 mt-14">
                Showcase Game of {userDetails ? userDetails.Username : ""}
              </h1>
              {!uploaded ? (
                <ReusableUploadForm
                  title={formData.title}
                  description={formData.description}
                  releaseDate={formData.releaseDate}
                  mediaUrl={formData.mediaUrl}
                  onInputChange={handleInputChange}
                  onSubmit={handleSubmit}
                  genres={formData.genres}
                  genreList={formData.genreList}
                />
              ) : (
                <div className="flex justify-center mt-6 text-2xl font-semibold">
                  {" "}
                  Game Uploaded Successfully!
                  <FaCheckCircle className="text-green-500 text-4xl mr-2 ml-6 text-3xl" />
                </div>
              )}
              {loading && (
                <div className="mt-6  flex justify-center items-center">
                  <ReusableSpinner />
                </div>
              )}
            </>
          ) : (
            <div className="flex justify-center mt-6 text-2xl font-semibold">
              {" "}
              Please Login To Add Your Games
              <FaExclamationTriangle className="text-green-500 text-4xl mr-2 ml-8 text-3xl" />
            </div>
          )}
        </>
      )}
    </main>
  );
};

export default Showcase;
