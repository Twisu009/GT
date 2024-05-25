"use client";

import { get_all_genres, get_genres } from "@/components/genre/genre.services";
import LoadingUI from "@/components/loading/Loading";
import { useLoading } from "@/components/loading/LoadingContext";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ReusableNewReleases } from "@/components/ui/new-releases";
import { ReusableSearchFilter } from "@/components/ui/reusable-search-filter";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface FormValues {
  value: string;
  skip: number;
  count: number;
}
interface IGenreList {
  GenreID: number;
  GenreName: string;
  ImageUrl: string | null;
}
export default function Genre() {
  const [genreList, setGenreList] = useState<IGenreList[]>([]);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(10);
  const { loading, setLoading } = useLoading();
  const [search, setSearch] = useState("");

  useEffect(() => {
    initial();
  }, []);

  const initial = async () => {
    setLoading(true);
    try {
      const response = await get_genres({
        skip: 0,
        count: 10,
        value: search,
      });
      setGenreList(response.results);
      setSkip(0);
      setTotal(response.total);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    setLoading(true);
    try {
      const response = await get_genres({
        skip: skip + 10,
        count: 10,
        value: search,
      });
      setSkip(skip + 10);
      setGenreList((prev) => [...prev, ...response.results]);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <LoadingUI />
      ) : (
        <div className="flex flex-col justify-center items-center w-full">
          <div className=" flex justify-center gap-2 items-end mt-10 text-center text-2xl font-bold mb-8">
            <div className="flex w-[150px] border-t-4  border-black my-4"></div>
            <div className="flex gap-2 ">
              <span style={{ color: "#071013" }}>Genre </span>
              <span style={{ color: "#6bd3b6" }}>List</span>
            </div>
            <div className="flex w-[150px] border-t-4  border-black my-4"></div>
          </div>
          <input
            type="text"
            value={search}
            className="px-4 py-2 mb-8 mt-10 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                initial();
              }
            }}
            placeholder="Enter to search..."
          />

          {/* Genre boxes section */}
          <div className="container mx-auto mt-14">
            <div className="flex flex-wrap justify-center">
              {/* Renders GenreBox component for each genre */}
              {genreList.map((value) => (
                <ReusableNewReleases
                  key={value.GenreID}
                  NewReleasescardLink={`/pages/genre/${value.GenreID}`}
                  text={value.GenreName}
                  imageSrc={value.ImageUrl ?? ""}
                />
              ))}
            </div>
          </div>
          <br></br>
          <div className="flex justify-center text-center items-center container mx-auto">
            Total Available:{total}
          </div>
          <br></br>
          <div className="flex justify-center">
            {total > genreList.length && (
              <button
                className="bg-transparent text-custom-blue-green font-semibold py-2 px-4 border rounded transition-colors duration-300 hover:text-custom-teal hover:border-custom-blue-green flex items-center"
                onClick={loadMore}
              >
                Load more...
              </button>
            )}
          </div>
          <br></br>
        </div>
      )}
    </>
  );
}
