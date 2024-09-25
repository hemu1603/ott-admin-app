"use client";

import Sidebar from "./components/Sidebar";
import UserForm from "./components/UserForm";
import MovieForm from "./components/MovieForm";
import UserList from "./components/UserList";
import MovieList from "./components/MovieList";
import Header from "./components/Header";
import { useState } from "react";

export default function Home() {
  const [tab, setTab] = useState(1);
  return (
    <div>
      <Header setTab={setTab} tab={tab} />
      <div className="flex">
        <Sidebar setTab={setTab} tab={tab} />
        {tab == 1 && <MovieList />}
        {tab == 2 && <UserList />}
        {tab == 3 && <UserForm />}
        {tab == 4 && <MovieForm />}
      </div>
    </div>
  );
}
