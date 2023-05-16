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

export const ADD_THOUGHT = gql`
mutation AddExercise($name: String!, $description: String!, $type: String!) {
  addExercise(name: $name, description: $description, type: $type) {
    _id
    date
    description
    name
    type
    userId {
      _id
    }
  }
}
`;

export const ADD_COMMENT = gql`
mutation RemoveExercise($exerciseId: ID!) {
  removeExercise(exerciseId: $exerciseId) {
    _id
    name
    description
    date
    type
    userId {
      _id
    }
  }
}
`;
