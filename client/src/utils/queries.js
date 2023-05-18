import { gql } from '@apollo/client';

export const QUERY_USER = gql`
query user($username: String!) {
  user(username: $username) {
    _id
    username
    email
    password
    exercises {
      _id
      type
      weight
      reps
      note
      date
      user
    }
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

export const QUERY_EXERCISES = gql`
query exercises {
  exercises {
    _id
    type
    weight
    reps
    note
    date
  }
}
`;

export const QUERY_SINGLE_EXERCISE = gql`
query exercise($exerciseId: ID!) {
  exercise(exerciseId: $exerciseId) {
    _id
    type
    weight
    reps
    note
    date
  }
}
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      password
      exercises {
        _id
        type
        weight
        reps
        note
        date
      }
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
