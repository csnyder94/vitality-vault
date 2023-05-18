const { AuthenticationError } = require('apollo-server-express');
const { User, Exercise } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('exercises')
    },
    exercises: async (parent, args, context) => {
      if (context.user) {
        return Exercise.find({ user: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
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
    addExercise: async (parent, { type, weight, reps, note }, context) => {
  if (context.user) {
    const exercise = await Exercise.create({
      type,
      weight,
      reps,
      note,
      user: context.user._id,
    });

    await User.findByIdAndUpdate(context.user._id, {
      $push: { exercises: exercise._id },
    });

    return exercise;
  }

  throw new AuthenticationError('You need to be logged in!');
},
    removeExercise: async (parent, { exerciseId }, context) => {
  if (context.user) {
    const exercise = await Exercise.findOneAndDelete({
      _id: exerciseId,
      user: context.user._id,
    });

    await User.findByIdAndUpdate(context.user._id, {
      $pull: { exercises: exercise._id },
    });

    return exercise;
  }

  throw new AuthenticationError('You need to be logged in!');
},
    updateUser: async (parent, { userData }, context) => {
      if (context.user) {
        return User.findByIdAndUpdate({ _id: context.user._id }, { $set: userData }, {
          new: true,
        });
      }

      throw new AuthenticationError('Not logged in');
    },
  },

};

module.exports = resolvers;
