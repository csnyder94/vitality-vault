import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_EXERCISE = gql`
mutation AddExercise($type: String!, $weight: Int!, $reps: Int!, $note: String!) {
  addExercise(type: $type, weight: $weight, reps: $reps, note: $note) {
    _id
    type
    weight
    reps
    note
    date
  }
}
`;

export const REMOVE_EXERCISE = gql`
mutation AddExercise($exerciseId: ID!) {
  removeExercise(exerciseId: $exerciseId) {
    type
    weight
    reps
    note
    date
  }
}
`;

export const UPDATE_USER = gql`mutation Mutation($userData: userData!) {
  updateUser(userData: $userData) {
    _id
    username
    email
    password
    age
    height
    weight
    bmi
    neck
    chest
    waist
  }
}
`;