/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { graphql, buildSchema } from "graphql";
import { MongoClient } from "mongodb";

// Define your GraphQL schema
const schema = buildSchema(`
  type Query {
    hello: String
    getAllUsers: [User]
    getAllMovies(category: String): [Movie]
  }

  type User {
    _id: ID!
    name: String!
    email: String!
  }

  type Movie {
    _id: ID!
    title: String!
    description: String!
    videoUrl: String!
    thumbnail: String!
    category: String!
    uploadedDate: String!
  }

  type Mutation {
    addUser(name: String!, email: String!): User
    addMovie(title: String!, description: String!, videoUrl: String!, thumbnail: String!, category: String!, uploadedDate: String!): Movie
  }
`);

// MongoDB Connection
async function connectToDatabase() {
  const client = new MongoClient(process.env.MONGODB_URI!);
  await client.connect();
  return client.db("ott-admin-app");
}

// Define resolvers
const rootValue = {
  hello: () => "Hello from GraphQL!",
  getAllUsers: async () => {
    const db = await connectToDatabase();
    const users = await db.collection("users").find().toArray();
    return users;
  },
  addUser: async ({ name, email }: { name: string; email: string }) => {
    const db = await connectToDatabase();
    const newUser = { name, email };
    const result = await db.collection("users").insertOne(newUser);
    return { _id: result.insertedId, ...newUser };
  },
  getAllMovies: async ({ category }: { category?: string }) => {
    const db = await connectToDatabase();
    const query = category ? { category: category } : {};
    const movies = await db.collection("movies").find(query).toArray();
    return movies;
  },
  addMovie: async ({
    title,
    description,
    videoUrl,
    thumbnail,
    category,
    uploadedDate,
  }: {
    title: string;
    description: string;
    videoUrl: string;
    thumbnail: string;
    category: string;
    uploadedDate: string;
  }) => {
    const db = await connectToDatabase();
    const newMovie = {
      title,
      description,
      videoUrl,
      thumbnail,
      category,
      uploadedDate,
    };
    const result = await db.collection("movies").insertOne(newMovie);
    return { _id: result.insertedId, ...newMovie };
  },
};

// Handle the GraphQL request
export async function POST(req: NextRequest) {
  try {
    const { query, variables } = await req.json();

    const response = await graphql({
      schema,
      source: query,
      rootValue,
      variableValues: variables,
    });

    // Check for errors in the GraphQL response
    if (response.errors) {
      return NextResponse.json({ errors: response.errors }, { status: 400 });
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error processing GraphQL request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
