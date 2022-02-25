const express = require('express');
const router = express.Router();

const { User } = require('../models/user.model');

router.put('/', async (req, res) => {
  const userEmail = req.body.email;
  const GUID = req.body.GUID;

  try {
    const user = await User.findOne({ email: userEmail });

    console.log('User', user);

    if (!user)
      return res.send({
        message: 'Could not find your email. Please re-register',
      });

    if (user.GUID != GUID)
      return res.send({
        message: 'Cannot activate this account. Please register again.',
      });

    if (user.GUID === GUID) {
      user.activated = true;
      const result = await user.save();

      console.log('Result', result);

      return res.send(result);
    }
  } catch (error) {
    res.send({ message: error.message });
  }
});

module.exports = router;
