/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";

interface HeaderProps {
  setTab: (tab: number) => void;
  tab: number;
}

const Header: React.FC<HeaderProps> = ({ setTab, tab }) => {
  return (
    <div className="flex bg-blue-600 p-x-4">
      <h1 className="text-2xl px-3 py-3 font-bold text-white mr-10">
        OTT Admin Dashboard
      </h1>
      <div
        onClick={() => {
          setTab(1);
        }}
        className={`block mx-5 px-3 py-4 text-base font-bold 
        ${
          tab === 1
            ? "bg-teal-950"
            : ""
        } text-gray-200 hover:underline hover:text-white`}
      >
        Movies
      </div>
      <div
        onClick={() => {
          setTab(2);
        }}
        className={`block mx-5 px-3 py-4 text-base font-bold 
            ${
              tab === 2
                ? "bg-teal-950"
                : ""
            } text-gray-200 hover:underline hover:text-white`}
      >
        Users
      </div>
    </div>
  );
};

export default Header;
