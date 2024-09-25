import { gql } from "graphql-request";

export const GET_ALL_USERS = gql`
  query {
    getAllUsers {
      _id
      name
      email
    }
  }
`;

export const GET_ALL_MOVIES = gql`
  query {
    getAllMovies {
      _id
      title
      description
      videoUrl
    }
  }
`;

export const ADD_USER = gql`
  mutation ($name: String!, $email: String!) {
    addUser(name: $name, email: $email) {
      _id
      name
      email
    }
  }
`;

export const ADD_MOVIE = gql`
  mutation ($title: String!, $description: String!, $videoUrl: String!) {
    addMovie(title: $title, description: $description, videoUrl: $videoUrl) {
      _id
      title
      description
      videoUrl
    }
  }
`;
