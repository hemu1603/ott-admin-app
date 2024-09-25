// src/components/Sidebar.tsx
import React from "react";

interface SideBarProps {
  setTab: (tab: number) => void;
  tab: number
}

const Sidebar: React.FC<SideBarProps> = ({ setTab, tab }) => {
  return (
    <nav className="h-screen bg-gray-800 text-white w-64 p-y-6 pt-5">
      <ul className="space-y-4">
        <li>
          <div
            onClick={() => setTab(3)}
            className={`cursor-pointer p-3 text-lg hover:bg-blue-500 transition-colors duration-300 
                ${
                  tab === 3
                    ? "bg-blue-500"
                    : "bg-gray-700"
                }`}
          >
            Add User
          </div>
        </li>
        <li>
          <div
            onClick={() => setTab(4)}
            className={`cursor-pointer p-3 text-lg hover:bg-blue-500 transition-colors duration-300 
                ${
                  tab === 4
                    ? "bg-blue-500"
                    : "bg-gray-700"
                }`}
          >
            Add Movie
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
