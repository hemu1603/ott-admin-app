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
  query GetAllMovies($category: String) {
    getAllMovies(category: $category) {
      _id
      title
      description
      videoUrl
      thumbnail
      category
      uploadedDate
    }
  }
`;

export const GET_SEARCHED_MOVIES = gql`
  query GetSearchedMovies($searchQuery: String) {
    getSearchedMovies(searchQuery: $searchQuery) {
      _id
      title
      description
      videoUrl
      thumbnail
      category
      uploadedDate
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
  mutation (
    $title: String!
    $description: String!
    $videoUrl: String!
    $thumbnail: String!
    $category: String!
    $uploadedDate: String!
  ) {
    addMovie(
      title: $title
      description: $description
      videoUrl: $videoUrl
      thumbnail: $thumbnail
      category: $category
      uploadedDate: $uploadedDate
    ) {
      _id
      title
      description
      videoUrl
      thumbnail
      category
      uploadedDate
    }
  }
`;
