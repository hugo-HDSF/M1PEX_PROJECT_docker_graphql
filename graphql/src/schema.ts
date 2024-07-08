export const typeDefs = `#graphql
type Movie {
  genre: String
  realisators: [Realisator]
  title: String
  year: String
}

input MovieInput {
  genre: String
  realisators: [RealisatorInput]
  title: String
  year: String
}

type Mutation {
  addMovie(genre: String!, realisators: [RealisatorInput]!, title: String!, year: String!): Movie
  addRealisator(birthdate: String!, firstname: String!, lastname: String!): Realisator
  addSaga(description: String, movies: [MovieInput], title: String!): Saga
  deleteMovie(title: String!): Boolean
  deleteRealisator(firstname: String!, lastname: String!): Boolean
  deleteSaga(title: String!): Boolean
  modifyMovie(findTitle: String!, genre: String!, realisators: [RealisatorInput]!, title: String!, year: String!): Movie
  modifyRealisator(birthdate: String!, firstname: String!, lastname: String!, newBirthdate: String!, newFirstname: String!, newLastname: String!): Realisator
  modifySaga(description: String, findTitle: String!, movies: [MovieInput]!, title: String!): Saga
}

type Query {
  movies: [Movie]
  realisators: [Realisator]
  sagas: [Saga]
}

type Realisator {
  birthdate: String
  firstname: String
  lastname: String
}

input RealisatorInput {
  birthdate: String!
  firstname: String!
  lastname: String!
}

type Saga {
  description: String
  movies: [Movie]
  title: String!
}`;