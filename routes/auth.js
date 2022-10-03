const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validateLogin } = require('../models/user.model');
const express = require('express');
const router = express.Router();
const { sendReactivateEmail } = require('../middleware/reactivate');

/**
 * @description login a user
 */
router.post('/', async (req, res) => {
  const { error } = await validateLogin(req.body);

  if (error) return res.status(400).send({ message: error.details[0].message });

  let email = req.body.email;

  let user = await User.findOne({ email: email.toLowerCase() });

  if (!user) {
    return res.status(400).send({ message: 'Invalid email or password.' });
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword) {
    return res.status(400).send({ message: 'Invalid email or password.' });
  }

  if (!user.activated) {
    return res.status(400).send({ message: 'This user is deactivated' });
  }

  const token = user.generateAuthToken();

  //res.send({ jwt: token, user: _.pick(user, ['firstName', 'email', '_id']) });
  res.send({
    jwt: token,
    user: user,
  });
});

/**
 * @description reactive user with current password
 */

router.put('/reactivate', async (req, res) => {
  try {
    const { error } = await validateLogin(req.body);

    if (error)
      return res.status(400).send({ message: error.details[0].message });

    let email = req.body.email;

    let user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(400).send({ message: 'Invalid email or password.' });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res.status(400).send({ message: 'Invalid email or password.' });
    }

    if (user && validPassword && user.activated) {
      return res.status(400).send({
        message:
          'This user is already activated, please go back to login screen.',
      });
    }

    sendReactivateEmail(user.firstName, user.email, user.GUID);
    return res.send({
      user: _.pick(user, ['firstName', 'email', '_id', 'activated', 'GUID']),
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
