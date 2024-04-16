"use client";

import React, { useState } from "react";
import axios from "axios";
import ReusableSpinner from "@/components/ui/spinner";
import ReusableUploadForm from "@/components/ui/upload-form";
import { NextPage } from "next";

import {
  getUserDetailsInLocalStorage,
  getToken,
  saveUserDetailsInLocalStorage,
} from "../../../../utilities/local-storage";

const Showcase: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    releaseDate: "",
    imageUrl: "",
  });

  const handleInputChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setLoading(true);
    try {
      const token = getToken();
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      const response = await axios.post(
        "/api/game/protected",
        formData,
        config
      );
      console.log("Game uploaded:", response.data);
      setUploaded(true);
    } catch (error) {
      console.error("Error uploading content:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (blob: Blob) => {
    setFormData({ ...formData, imageUrl: URL.createObjectURL(blob) });
  };

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Showcase Your Game</h1>
      {!uploaded ? (
        <ReusableUploadForm
          title={formData.title}
          description={formData.description}
          releaseDate={formData.releaseDate}
          imageUrl={formData.imageUrl}
          onInputChange={handleInputChange}
          onImageUpload={handleImageUpload}
          onSubmit={handleSubmit}
        />
      ) : (
        <div>Game Uploaded Successfully!</div>
      )}
      {loading && (
        <div className="mt-6 flex justify-center items-center">
          <ReusableSpinner />
        </div>
      )}
    </main>
  );
};

export default Showcase;
