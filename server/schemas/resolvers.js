const { AuthenticationError } = require('apollo-server-express');
const { User, Exercise } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // user, profile, exercise, exercises, me
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('exercises')
    },
    // exercises: async (parent, { username }) => {
    //   const params = username ? { username } : {};
    //   return Exercise.find(params).sort({ createdAt: -1 });
    // },
    // exercise: async (parent, { exerciseId }) => {
    //   return Exercise.findOne({ _id: exerciseId });
    // },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('exercises')
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    // addUser, login, addExercise, removeExercise, updateExercise updateProfile, addProfile, logout
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;
