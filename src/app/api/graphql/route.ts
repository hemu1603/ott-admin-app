import { NextRequest, NextResponse } from 'next/server';
import { graphql, buildSchema } from 'graphql';
import { MongoClient } from 'mongodb';

// Define your GraphQL schema
const schema = buildSchema(`
  type Query {
    hello: String
    getAllUsers: [User]
    getAllMovies: [Movie]
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
  }

  type Mutation {
    addUser(name: String!, email: String!): User
    addMovie(title: String!, description: String!, videoUrl: String!): Movie
  }
`);

// MongoDB Connection
async function connectToDatabase() {
  const client = new MongoClient(process.env.MONGODB_URI!);
  await client.connect();
  return client.db('ott-admin-app');
}

// Define resolvers
const rootValue = {
  hello: () => 'Hello from GraphQL!',
  getAllUsers: async () => {
    const db = await connectToDatabase();
    const users = await db.collection('users').find().toArray();
    return users;
  },
  addUser: async ({ name, email }: { name: string; email: string }) => {
    const db = await connectToDatabase();
    const newUser = { name, email };
    const result = await db.collection('users').insertOne(newUser);
    return { _id: result.insertedId, ...newUser };
  },
  getAllMovies: async () => {
    const db = await connectToDatabase();
    const movies = await db.collection('movies').find().toArray();
    return movies;
  },
  addMovie: async ({ title, description, videoUrl }: { title: string; description: string; videoUrl: string }) => {
    const db = await connectToDatabase();
    const newMovie = { title, description, videoUrl };
    const result = await db.collection('movies').insertOne(newMovie);
    return { _id: result.insertedId, ...newMovie };
  }
};

// Handle the GraphQL request
export async function POST(req: NextRequest) {
  const { query, variables } = await req.json();
  const response = await graphql({
    schema,
    source: query,
    rootValue,
    variableValues: variables,
  });
  return NextResponse.json(response);
}
