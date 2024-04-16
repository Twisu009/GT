"use client";

import React, { ChangeEvent, useState } from "react";
import { GameFormProps } from "@/app/types/type";
import { FaUpload } from "react-icons/fa";

const ReusableUploadForm: React.FC<GameFormProps> = ({
  title,
  description,
  releaseDate,
  imageUrl,
  onInputChange,
  onImageUpload,
  onSubmit,
}) => {
  //image url
  const [imageURL, setImageURL] = useState("");
  const handleImageURLChange = (e: ChangeEvent<HTMLInputElement>) => {
    setImageURL(e.target.value);
  };
  const handleImageUpload = async () => {
    try {
      const response = await fetch(imageURL);
      const blob = await response.blob();
      onImageUpload(blob);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    onInputChange(name, value);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title:
        </label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description:
        </label>
        <textarea
          name="description"
          value={description}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Release Date:
        </label>
        <input
          type="date"
          name="releaseDate"
          value={releaseDate}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Image URL:
        </label>
        <input
          type="text"
          name="imageUrl"
          value={imageUrl}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2 w-full"
        />
      </div>
      <div>
        <button
          type="submit"
          onClick={() => {
            console.log("Button clicked!");
          }}
          className="bg-transparent text-custom-blue-green font-semibold py-2 px-4 border border-custom-teal rounded transition-colors duration-300  hover:text-white hover:border-transparent flex items-center"
        >
          <FaUpload style={{ color: "#6bd3b6", fontSize: "1.5rem" }} />
          <span style={{ color: "#6bd3b6" }}> Upload</span>
        </button>
      </div>
    </form>
  );
};

export default ReusableUploadForm;
