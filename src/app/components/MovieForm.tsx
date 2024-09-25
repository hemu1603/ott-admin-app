/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { GraphQLClient } from "graphql-request";
import { useState } from "react";
import { ADD_MOVIE } from "../lib/queryAndMutation";

const client = new GraphQLClient(
  `${process.env.NEXT_PUBLIC_API_URL || window.location.origin}/api/graphql`
);

export default function MovieForm() {

  const [movieTitle, setMovieTitle] = useState("");
  const [movieDescription, setMovieDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  // Add a new movie
  const addMovie = async () => {
    const variables = {
      title: movieTitle,
      description: movieDescription,
      videoUrl,
    };
    await client.request(ADD_MOVIE, variables);
    setMovieTitle("");
    setMovieDescription("");
    setVideoUrl("");
    // Refresh the movie list
    // const data: any = await client.request(GET_ALL_MOVIES);
    // setMovies(data.getAllMovies);
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
