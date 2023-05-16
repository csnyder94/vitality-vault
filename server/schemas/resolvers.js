const { AuthenticationError } = require('apollo-server-express');
const { User, Exercise } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // user, profile, exercise, exercises, me
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('exercises')
    },
    exercises: async () => { 
      return Exercise({});
    // exercises: async (parent, { username }) => {
    //   const params = username ? { username } : {};
    //   return Exercise.find(params).sort({ createdAt: -1 });
    },
    exercise: async (parent, { exerciseId }) => {
      return Exercise.findOne({ _id: exerciseId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('exercises')
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    // addUser, login, addExercise, removeExercise, updateExercise, updateUser
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
    addExercise: async (parent, { name, description, type }, context) => {
      if (context.user) {
        const exercise = await Exercise.create({
          name,
          description,
          type,
          userId: context.user._id
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { exercise: exercise._id } }
        );

        return exercise;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeExercise: async (parent, { exerciseId }, context) => {
      if (context.user) {
        const exercise = await Exercise.findOneAndDelete({
          _id: exerciseId
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { exercise: exercise._id } }
        );

        return exercise;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

  },
  // updateUser: async (parent, args, context) => {
  //   if (context.user) {
  //     return User.findByIdAndUpdate(context.user.id, args, {
  //       new: true,
  //     });
  //   }

  //   throw new AuthenticationError('Not logged in');
  // },
  // updateExercise: async (parent, { id }) => {

  //   return Exercise.findByIdAndUpdate(
  //     id,
  //     { new: true }
  //   );
  // },
};

module.exports = resolvers;
