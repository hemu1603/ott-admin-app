/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { GraphQLClient } from "graphql-request";
import { useState, useEffect } from "react";
import { GET_ALL_USERS } from "../lib/queryAndMutation";

export default function UserList() {
  const [users, setUsers] = useState<
    { _id: string; name: string; email: string }[]
  >([]);

  const [client, setClient] = useState<GraphQLClient | null>(null);

  useEffect(() => {
    // Initialize the GraphQL client only on the client side
    const apiURL = process.env.NEXT_PUBLIC_API_URL || (typeof window !== 'undefined' ? `${window.location.origin}/api/graphql` : '');
    
    if (apiURL) {
      const gqlClient = new GraphQLClient(apiURL);
      setClient(gqlClient);
    }
  }, []);

  useEffect(() => {
    if (client) {
      // Fetch all users
      client.request(GET_ALL_USERS).then((data: any) => {
        setUsers(data.getAllUsers);
      });
    }
  }, [client]);

  const allUsers = (
    <div className="flex flex-col p-4 w-full">
      <h2 className="text-2xl font-semibold mt-6 text-blue-600 mb-4">
        Users List
      </h2>

      <div className="bg-white w-fit shadow-md rounded-lg overflow-y-auto p-4">
        <ul className="divide-y divide-gray-200">
          {users.length > 0 ? (
            users.map((user) => (
              <li
                key={user._id}
                className="flex justify-between items-center py-3 px-4 hover:bg-gray-100 rounded-md transition-all duration-200 ease-in-out"
              >
                <div>
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </li>
            ))
          ) : (
            <li className="text-center py-10 text-gray-500">No users found</li>
          )}
        </ul>
      </div>
    </div>
  );

  return <div className="flex p-4">{allUsers}</div>;
}
