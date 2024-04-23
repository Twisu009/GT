"use client";

import React, { ChangeEvent } from "react";
import { GameFormProps } from "@/app/types/type";
import { MenuItem, Select } from "@mui/material";
import { useLoading } from "../loading/LoadingContext";

const ReusableUploadForm: React.FC<GameFormProps> = ({
  title,
  description,
  releaseDate,
  mediaUrl,
  genres,
  genreList,
  onInputChange,
  onSubmit,
}) => {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    onInputChange(name, value);
  };
  const { setLoading } = useLoading();

  function formatDateWithoutTimezone(val: string) {
    let date = new Date();
    if (val) date = new Date(val);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  return (
    <form onSubmit={onSubmit}>
      <div className="mb-8">
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
      <div className="mb-8">
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
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Genre:
        </label>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          name="genres"
          value={genres}
          onChange={(val) => {
            onInputChange("genres", val.target.value as any);
          }}
        >
          {genreList.map((g) => (
            <MenuItem key={g.GenreID} value={g.GenreID}>
              {g.GenreName}
            </MenuItem>
          ))}
        </Select>
      </div>

      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Release Date:
        </label>
        <input
          type="date"
          name="releaseDate"
          value={formatDateWithoutTimezone(releaseDate)}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2 w-full"
        />
      </div>
      <div className="mb-10">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Image URL:
        </label>
        <input
          type="text"
          name="mediaUrl"
          value={mediaUrl}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2 w-full"
        />
      </div>

      <button
        type="submit"
        className="bg-custom-blue-green text-slate-100 font-semibold py-2 px-4 border rounded transition-colors duration-300 hover:bg-transparent hover:text-custom-blue-green hover:border-custom-teal"
      >
        Upload
      </button>
    </form>
  );
};

export default ReusableUploadForm;
