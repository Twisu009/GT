"use client";

import LoadingUI from "@/components/loading/Loading";
import { useLoading } from "@/components/loading/LoadingContext";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import ReusableGenreBox from "@/components/ui/genre-box";
import { Input } from "@/components/ui/input";
import { ReusableNewReleases } from "@/components/ui/new-releases";
import { ReusableSearchFilter } from "@/components/ui/reusable-search-filter";
import ReusableSpinner from "@/components/ui/spinner";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface FormValues {
  value: string;
  skip: number;
  count: number;
}
interface IGenreList {
  results: {
    GenreID: number;
    GenreName: string;
    ImageUrl: string;
  }[];
  total: number;
}
export default function Genre() {
  const form = useForm<FormValues>({
    defaultValues: {
      value: "",
      skip: 0,
      count: 10,
    },
  });
  const [genreList, setGenreList] = useState<IGenreList>({
    results: [],
    total: 0,
  });

  const [isLoadMore, setIsLoadMore] = useState(false);
  const { loading, setLoading } = useLoading();

  const handleSearch = (query: FormValues) => {
    query.skip = 0;
    query.count = 10;
    form.setValue("skip", 0);
    form.setValue("count", 10);
    callGenres(query);
  };
  const loadMore = () => {
    let values = form.getValues();
    values.skip += 10;
    values.count += 10;
    form.setValue("skip", values.skip);
    form.setValue("count", values.count);
    callGenres(values, true);
  };

  const callGenres = async (query: FormValues, isMore = false) => {
    try {
      setLoading(true);
      let genres: AxiosResponse<IGenreList> = await axios("/api/genre", {
        params: query,
      });
      if (genres.data.total > query.skip + query.count) {
        setIsLoadMore(true);
      } else {
        setIsLoadMore(false);
      }
      if (isMore) {
        setGenreList((prev) => {
          return {
            results: [...prev.results, ...genres.data.results],
            total: genres.data.total,
          };
        });
      } else {
        setGenreList(genres.data);
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    let query = form.getValues();
    callGenres(query);
  }, []);

  return (
    <>
      {loading ? (
        <LoadingUI />
      ) : (
        <main className="flex-col justify-center items-center h-screen">
          <div>
            <div className=" flex justify-center gap-2 items-end mt-10 text-center text-2xl font-bold mb-8">
              <div className="flex w-[150px] border-t-4  border-black my-4"></div>
              <div className="flex gap-2 ">
                <span style={{ color: "#071013" }}>Genre </span>
                <span style={{ color: "#6bd3b6" }}>List</span>
              </div>
              <div className="flex w-[150px] border-t-4  border-black my-4"></div>
            </div>
            <ReusableSearchFilter onCustomSubmit={handleSearch} form={form}>
              <div>
                <FormField
                  control={form.control}
                  name="value"
                  render={({ field }) => (
                    <FormItem className="flex justify-center w-200">
                      <FormControl>
                        <Input
                          placeholder="search genre..."
                          {...field}
                          className="w-full"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="skip"
                  render={({ field }) => <></>}
                />
                <FormField
                  control={form.control}
                  name="count"
                  render={({ field }) => <></>}
                />
              </div>
            </ReusableSearchFilter>
          </div>

          {/* Genre boxes section */}
          <div className="container mx-auto mt-14">
            <div className="flex flex-wrap justify-center">
              {/* Renders GenreBox component for each genre */}
              {genreList.results.map((value) => (
                <ReusableNewReleases
                  key={value.GenreID}
                  NewReleasescardLink={`/pages/genre/${value.GenreID}`}
                  text={value.GenreName}
                  imageSrc={value.ImageUrl}
                />
              ))}
            </div>
          </div>
          <br></br>
          <div className="flex justify-center text-center items-center container mx-auto">
            Total Available:{genreList.total}
          </div>
          <br></br>
          <div className="flex justify-center">
            {isLoadMore && (
              <button
                className="bg-transparent text-custom-blue-green font-semibold py-2 px-4 border rounded transition-colors duration-300 hover:text-custom-teal hover:border-custom-blue-green flex items-center"
                onClick={loadMore}
              >
                Load more...
              </button>
            )}
          </div>
          <br></br>
        </main>
      )}
    </>
  );
}
