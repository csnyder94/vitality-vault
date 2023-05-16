const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    exercises: [Exercise]!
  }

  type Exercise {
    _id: ID
    name: String
    description: String
    date: String
    type: String!
    userId: User
  }

  type Auth {
    token: ID!
    user: User
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
    addExercise(name: String!, description: String!, type: String!): Exercise
    removeExercise( exerciseId: ID!): Exercise

    
  }
`;
//     updateUser(
//   firstName: String
//   lastName: String
//   email: String
//   password: String
//   age: Int
//   height: Int
//   weight: Int
//   bmi: Int
//   neck: Int
//   chest: Int
//   waist: Int
// ): User

//  updateExercise(_id: ID!): Exercise


module.exports = typeDefs;
