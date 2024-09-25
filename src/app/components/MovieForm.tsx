/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { GraphQLClient } from "graphql-request";
import { useState, useEffect } from "react";
import { ADD_MOVIE } from "../lib/queryAndMutation";

export default function MovieForm() {
  const [client, setClient] = useState<GraphQLClient | null>(null);
  const [movieTitle, setMovieTitle] = useState("");
  const [movieDescription, setMovieDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  // Initialize the GraphQL client only on the client side
  useEffect(() => {
    const apiURL = process.env.NEXT_PUBLIC_API_URL || (typeof window !== "undefined" ? `${window.location.origin}/api/graphql` : "");
    
    if (apiURL) {
      const gqlClient = new GraphQLClient(apiURL);
      setClient(gqlClient);
    }
  }, []);

  // Add a new movie
  const addMovie = async () => {
    if (!client) return;

    const variables = {
      title: movieTitle,
      description: movieDescription,
      videoUrl,
    };
    await client.request(ADD_MOVIE, variables);
    setMovieTitle("");
    setMovieDescription("");
    setVideoUrl("");
  };

  const addMovieComp = (
    <>
      <h2 className="text-2xl font-semibold text-blue-600 mb-6">Add Movie</h2>
      <div className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={movieTitle}
          onChange={(e) => setMovieTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={movieDescription}
          onChange={(e) => setMovieDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Video URL"
          className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />
        <button
          onClick={addMovie}
          className="py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors"
        >
          Add Movie
        </button>
      </div>
    </>
  );

  return (
    <div className="flex justify-center items-center w-full p-6 bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
        {addMovieComp}
      </div>
    </div>
  );
}
