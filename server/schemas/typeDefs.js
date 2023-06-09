const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    exercises: [Exercise]!
    age: Int
    height: Int
    weight: Int
    bmi: Int
    neck: Int
    chest: Int
    waist: Int
  }

  type Exercise {
    _id: ID
    type: String!
    weight: Int!
    reps: Int!
    note: String
    date: String
  }

  type Auth {
    token: ID!
    user: User
  }

input userData {
     age: Int
     height: Int
     weight: Int
     bmi: Int
     neck: Int
     chest: Int
     waist: Int
}

  type Query {
    user(username: String!): User
    exercises: [Exercise]
    exercise(exerciseId: ID!): Exercise
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addExercise(type: String!, weight: Int!, reps: Int!, note: String!): Exercise
    removeExercise( exerciseId: ID!): Exercise
    updateUser(userData: userData!): User    
  }
`;

module.exports = typeDefs;
