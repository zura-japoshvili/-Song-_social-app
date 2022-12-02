const mongoose = require('mongoose');

const userSchema = new mongoose.Schema (
    {
        username: {
            type: String,
            require: true,
            min: 3,
            max: 20,
            unique: true,
          },
          firstName: {
            type: String,
            require: true,
            min: 2,
            max: 30,
          },
          lastName: {
            type: String,
            require: true,
            min: 2,
            max: 30,
          },       
          email: {
            type: String,
            required: true,
            max: 50,
            unique: true,
          },
          password: {
            type: String,
            required: true,
            min: 6,
          },
          profilePicture: {
            type: String,
            default: "",
          },
          coverPicture: {
            type: String,
            default: "",
          },
          followers: {
            type: Array,
            default: [],
          },
          followings: {
            type: Array,
            default: [],
          },
          isAdmin: {
            type: Boolean,
            default: false,
          },
          desc: {
            type: String,
            max: 250,
          },
          lives: {
            type: String,
            max: 50,
          },
          from: {
            type: String,
            max: 50,
          },
          relationship: {
            type: Boolean
          },
          active: {
            type: Boolean
          },
          lastActive: {
            type: String
          }
    },
    {timeseries: true}
)

module.exports = new mongoose.model('User', userSchema);