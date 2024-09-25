/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { GraphQLClient } from "graphql-request";
import { useState, useEffect } from "react";
import { ADD_USER } from "../lib/queryAndMutation";

export default function UserForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [client, setClient] = useState<GraphQLClient | null>(null);

  // Initialize the GraphQL client only on the client side
  useEffect(() => {
    const apiURL = process.env.NEXT_PUBLIC_API_URL || (typeof window !== "undefined" ? `${window.location.origin}/api/graphql` : "");

    if (apiURL) {
      const gqlClient = new GraphQLClient(apiURL);
      setClient(gqlClient);
    }
  }, []);

  // Add a new user
  const addUser = async () => {
    if (client) {
      const variables = { name, email };
      await client.request(ADD_USER, variables);
      setName("");
      setEmail("");
      // Refresh the user list or other post-request actions here
      // const data: any = await client.request(GET_ALL_USERS);
      // setUsers(data.getAllUsers);
    }
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
