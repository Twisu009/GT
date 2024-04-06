"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import ReusableGenreBox from "@/components/ui/genre-box";
import { Input } from "@/components/ui/input";
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
  results: {
    GenreID: number;
    GenreName: string;
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
  };
  useEffect(() => {
    let query = form.getValues();
    callGenres(query);
  }, []);
  return (
    <main className="flex-col justify-center items-center h-screen">
      <div>
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
                      className="w-200"
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
      <div className="container mx-auto mt-20">
        <div className="flex flex-wrap justify-center">
          {/* Renders GenreBox component for each genre */}
          {genreList.results.map((value) => (
            <ReusableGenreBox
              key={value.GenreID}
              genre={value.GenreName}
              imageSrc={""}
            />
          ))}
        </div>
      </div>
      {isLoadMore && <Button onClick={loadMore}>Load more...</Button>}
      <div className="text-center items-center container mx-auto">
        Total Available:{genreList.total}
      </div>
    </main>
  );
}
