/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { GraphQLClient } from "graphql-request";
import { useState } from "react";
import { ADD_USER } from "../lib/queryAndMutation";

const client = new GraphQLClient(
  `${process.env.NEXT_PUBLIC_API_URL || window.location.origin}/api/graphql`
);

export default function UserForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Add a new user
  const addUser = async () => {
    const variables = { name, email };
    await client.request(ADD_USER, variables);
    setName("");
    setEmail("");
    // Refresh the user list
    // const data: any = await client.request(GET_ALL_USERS);
    // setUsers(data.getAllUsers);
  };

  const addUserComp = (
    <>
      <h2 className="text-2xl font-semibold text-blue-600 mb-6">Add User</h2>
      <div className="flex flex-col w-full space-y-4">
        <input
          type="text"
          placeholder="Name"
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={addUser}
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors"
        >
          Add User
        </button>
      </div>
    </>
  );

  return (
    <div className="flex justify-center items-center w-full p-6 bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
        {addUserComp}
      </div>
    </div>
  );
}
