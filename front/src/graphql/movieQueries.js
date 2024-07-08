import { gql } from '@apollo/client';

export const GET_MOVIES = gql`
    query {
        movies {
            title
            year
            genre
            realisators {
                firstname
                lastname
                birthdate
            }
        }
    }
`;

export const ADD_MOVIE = gql`
    mutation AddMovie($title: String!, $year: String!, $genre: String!, $realisators: [RealisatorInput!]!) {
        addMovie(title: $title, year: $year, genre: $genre, realisators: $realisators) {
            title
            year
            genre
            realisators {
                firstname
                lastname
                birthdate
            }
        }
    }
`;

export const DELETE_MOVIE = gql`
    mutation DeleteMovie($title: String!) {
        deleteMovie(title: $title)
    }
`;

export const MODIFY_MOVIE = gql`
    mutation ModifyMovie($findTitle: String!, $title: String!, $year: String!, $genre: String!, $realisators: [RealisatorInput]!) {
        modifyMovie(findTitle: $findTitle, title: $title, year: $year, genre: $genre, realisators: $realisators) {
            title
            year
            genre
            realisators {
                firstname
                lastname
                birthdate
            }
        }
    }
`;