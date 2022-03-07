const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const _ = require('lodash');
const { User, validateUser } = require('../models/user.model');
const { sendEmail } = require('../middleware/email');
const { sendEmailReset } = require('../middleware/email-reset');
const auth = require('../middleware/auth');

/**
 * @description CREATE a new user
 */
router.post('/register', async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  let user = await User.findOne({ email: req.body.email });

  if (user) {
    return res.status(400).send({ message: 'User already registered.' });
  }
  if (req.body.password.length < 8) {
    return res
      .status(400)
      .send({ message: 'Password must be at least 8 characters' });
  }
  let firstName = req.body.firstName;
  let email = req.body.email;
  let password = req.body.password;

  // chose not to use pick method because of hardcoded activated and GUID
  user = new User({
    firstName: firstName,
    email: email.toLowerCase(),
    password: password,
    activated: false,
    GUID: uuidv4(),
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  let newUser = await user.save();

  sendEmail(newUser.firstName, newUser.email, newUser.GUID);
  res.send({
    user: _.pick(user, ['firstName', 'email', '_id', 'activated']),
  });
});

/**
 * @description generate new GUID to reset password
 */

router.put('/reset', async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).send({
        message: 'If this account is registered you will receive an email.',
      });
    }

    user.GUID = uuidv4();
    let result = await user.save();

    sendEmailReset(user.firstName, user.email, user.GUID);

    return res.send({
      user: _.pick(user, ['firstName', 'email', '_id', 'activated', 'GUID']),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: 'There was a problem with the server, please try again later.',
    });
  }
});

/**
 * @description UPDATE for forgot password reset
 */
router.put('/newpass', async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).send({ message: 'No User' });
    }

    let password = req.body.password;

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    let result = await user.save();
    res.send({ result });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message:
        'There was a problem resetting your password, please try again later',
    });
  }
});

module.exports = router;
