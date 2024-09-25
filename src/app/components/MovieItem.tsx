import React, { useState } from "react";

interface MovieProps {
  _id: string;
  title: string;
  description: string;
  videoUrl: string;
}

const MovieItem: React.FC<MovieProps> = ({ _id, title, description, videoUrl }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const shortDescription =
    description.length > 100 ? description.slice(0, 100) + "..." : description;

  return (
    <li
      key={_id}
      className="block max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <div>
        <iframe
          className="rounded-md w-full h-64" // Set the height of the iframe
          src={videoUrl}
          title={title}
        />
      </div>
      <h3 className="mt-4 p-5 text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
      <p className="mt-2 p-5 text-gray-700 dark:text-gray-300">
        {isExpanded ? description : shortDescription}
        {description.length > 100 && (
          <span
            onClick={toggleDescription}
            className="ml-2 text-blue-500 cursor-pointer hover:underline"
          >
            {isExpanded ? "Show less" : "Show more"}
          </span>
        )}
      </p>
    </li>
  );
};

export default MovieItem;
