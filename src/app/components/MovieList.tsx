/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { GraphQLClient } from "graphql-request";
import { useState, useEffect } from "react";
import { GET_ALL_MOVIES } from "../lib/queryAndMutation";
import MovieItem from "./MovieItem";

const client = new GraphQLClient(
  `${process.env.NEXT_PUBLIC_API_URL || window.location.origin}/api/graphql`
);

export default function MovieList() {
  const [movies, setMovies] = useState<
    { _id: string; title: string; description: string; videoUrl: string }[]
  >([]);

  // Fetch all movies
  useEffect(() => {
    client.request(GET_ALL_MOVIES).then((data: any) => {
      setMovies(data.getAllMovies);
    });
  }, []);

  const allMovies = (
    <div>
      <h2 className="text-xl font-semibold mt-6">Movies</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
        {movies.map((movie) => (
          <MovieItem
            key={movie._id}
            _id={movie._id}
            title={movie.title}
            description={movie.description}
            videoUrl={movie.videoUrl}
          />
        ))}
      </ul>
    </div>
  );

  return (
    <div className="flex p-4 h-[600px] overflow-y-auto">
      {allMovies}
    </div>
  );
}
