const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const inventorySchema = new mongoose.Schema({
  size: {
    type: String,
  },
  purchased: {
    type: Number,
  },
  used: {
    type: Number,
  },
});

const diaperHistorySchema = new mongoose.Schema({
  date: {
    required: true,
    trim: true,
    type: String,
    maxlength: 10,
  },
  amount: {
    required: true,
    trim: true,
    type: Number,
    maxlength: 2,
  },
});

const childrenSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 99,
  },
  brandPreference: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 99,
  },
  currentSize: {
    type: String,
    required: true,
  },
  currentSizeLabel: {
    type: String,
    required: true,
  },
  lowAlert: {
    type: String,
    required: true,
  },
  diaperHistory: [diaperHistorySchema],
  totalPurchased: {
    type: Number,
  },
  totalUsed: {
    type: Number,
  },
  inventory: [inventorySchema],
});

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 99,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: 5,
      maxlength: 255,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      maxlength: 1024,
    },
    activated: {
      type: Boolean,
      required: true,
    },
    GUID: {
      type: String,
      required: true,
    },
    currentChild: {
      type: String,
      trim: true,
      minlength: 1,
      maxlength: 99,
    },
    children: [childrenSchema],
  },
  {
    timestamps: true,
  }
);

// add method to user object
// cannot user arrow function here since it does not have their own 'this'
// if you want to create a method that is part of an object, do not use arrow function
userSchema.methods.generateAuthToken = function () {
  try {
    const token = jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'));
    return token;
  } catch (err) {
    console.log('user.models.js err: ', err);
  }
};

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = Joi.object({
    firstName: Joi.string().min(1).max(99).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(8).max(1024).required(),
  });

  const { error, value } = schema.validate(user);
  return { error, value };
}

function validateLogin(login) {
  console.log('model login: ', login);
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(8).max(1024).required(),
  });
  const { error, value } = schema.validate(login);
  console.log('model error:', error);
  console.log('model value:', value);
  return { error, value };
}

exports.User = User;
exports.validateUser = validateUser;
exports.validateLogin = validateLogin;
