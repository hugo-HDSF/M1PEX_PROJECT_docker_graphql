import { gql } from '@apollo/client';

export const GET_REALISATORS = gql`
    query {
        realisators {
            firstname
            lastname
            birthdate
        }
    }
`;

export const ADD_REALISATOR = gql`
    mutation AddRealisator($firstname: String!, $lastname: String!, $birthdate: String!) {
        addRealisator(firstname: $firstname, lastname: $lastname, birthdate: $birthdate) {
            firstname
            lastname
            birthdate
        }
    }
`;

export const MODIFY_REALISATOR = gql`
    mutation ModifyRealisator($firstname: String!, $lastname: String!, $birthdate: String!, $newFirstname: String!, $newLastname: String!, $newBirthdate: String!) {
        modifyRealisator(firstname: $firstname, lastname: $lastname, birthdate: $birthdate, newFirstname: $newFirstname, newLastname: $newLastname, newBirthdate: $newBirthdate) {
            firstname
            lastname
            birthdate
        }
    }
`;

export const DELETE_REALISATOR = gql`
    mutation DeleteRealisator($firstname: String!, $lastname: String!) {
        deleteRealisator(firstname: $firstname, lastname: $lastname)
    }
`;
