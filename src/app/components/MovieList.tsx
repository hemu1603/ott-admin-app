/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { GraphQLClient } from "graphql-request";
import { useState, useEffect } from "react";
import { GET_ALL_MOVIES } from "../lib/queryAndMutation";
import MovieItem from "./MovieItem";

export default function MovieList() {
  const [movies, setMovies] = useState<
    { _id: string; title: string; description: string; videoUrl: string; category: string }[]
  >([]);
  const [client, setClient] = useState<GraphQLClient | null>(null);

  // Initialize the GraphQL client only on the client side
  useEffect(() => {
    const apiURL = process.env.NEXT_PUBLIC_API_URL || (typeof window !== "undefined" ? `${window.location.origin}/api/graphql` : "");

    if (apiURL) {
      const gqlClient = new GraphQLClient(apiURL);
      setClient(gqlClient);
    }
  }, []);

  // Fetch all movies when the GraphQL client is ready
  useEffect(() => {
    if (client) {
      const variables = {};
      client.request(GET_ALL_MOVIES, variables).then((data: any) => {
        setMovies(data.getAllMovies);
      });
    }
  }, [client]);

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
            category={movie.category}
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
