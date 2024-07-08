// src/graphql/seriesQueries.js

import { gql } from '@apollo/client';

export const GET_SAGAS = gql`
    query {
        sagas {
            title
            description
            movies {
                title
            }
        }
    }
`;

export const ADD_SAGA = gql`
    mutation AddSaga($title: String!, $description: String!, $movies: [MovieInput]!) {
        addSaga(title: $title, description: $description, movies: $movies) {
            title
            description
            movies {
                title
            }
        }
    }
`;


export const MODIFY_SAGA = gql`
    mutation ModifySaga($findTitle: String!, $title: String!, $description: String!, $movies: [String!]!) {
        modifySaga(findTitle: $findTitle, title: $title, description: $description, movies: $movies) {
            title
            description
            movies {
                title
            }
        }
    }
`;

export const DELETE_SAGA = gql`
    mutation DeleteSaga($title: String!) {
        deleteSaga(title: $title)
    }
`;
