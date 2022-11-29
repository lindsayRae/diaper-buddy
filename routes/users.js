const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const fetch = require('node-fetch');
const { v4: uuidv4 } = require('uuid');
const _ = require('lodash');
const { User, validateUser } = require('../models/user.model');
const { KidsRecord } = require('../models/kids.model');
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

  if (user && user.activated) {
    return res.status(400).send({ message: 'User already registered.' });
  }
  if (user && !user.activated) {
    return res.status(400).send({
      message:
        'User already registered, but not activated. Please go back to login screen.',
    });
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
    currentChild: '',
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  try {
    let newUser = await user.save();
    console.log('newUser:', newUser);
    //? Need to create a header for the creation of the blank you document in kidsRecord
    let headers = {
      'Content-Type': 'application/json',
    };
    const token = user.generateAuthToken();

    //? Call out to existing endpoint to create a new kids record with empty array

    //! For the backend you need an absolute URL for the fetch method to work
    let baseURL = process.env.baseURL;
    let url = `${baseURL}/api/users/usersetup/${newUser._id}`;
    console.log('url:', url);
    let response = await fetch(url, {
      method: 'POST',
      headers: headers,
    });

    let json = await response.json();
    console.log('JSON:', json);

    sendEmail(newUser.firstName, newUser.email, newUser.GUID);
    res.send({
      jwt: token,
      user: _.pick(user, [
        'firstName',
        'email',
        '_id',
        'activated',
        'currentChild',
      ]),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: 'There was a problem creating your user, please try again later',
    });
  }
});

/**
 * @description UPDATE user to deactivate or reactivate
 */
router.put('/activateStatus', async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.body.id });

    if (!user) {
      return res.status(400).send({
        message: 'Could not find user.',
      });
    }
    user.activated = req.body.activateStatus;
    user.save();
    res.send(user);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: 'There was a problem with the server, please try again later.',
    });
  }
});

/**
 * @description UPDATE user active status with current password
 */
// router.put('/reactivate', async (req, res) => {

// })

/**
 * @description called after creating a new user to set up their empty kids array
 */
//? Called in create new user to set up empty KidsRecord
router.post('/usersetup/:id', async (req, res) => {
  let user_id = req.params.id;
  let newUserEntry = {
    user_id: user_id,
    kids: [],
  };
  console.log('newUserEntry:', newUserEntry);
  let kidsRecord = new KidsRecord(newUserEntry);
  console.log('kidsRecord:', kidsRecord);
  let result = await kidsRecord.save();

  res.send(result);
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

    let nodemailer = await sendEmailReset(
      user.firstName,
      user.email,
      user.GUID
    );

    // when auth is not working, nodemailer.responseCode will be 535
    // when auth is OK, nodemailer.responseCode will be undefined

    // nodemailer.response: 250 2.0.0 OK <CH2PR14MB4005FE869D6775CC3C284AD294129@CH2PR14MB4005.namprd14.prod.outlook.com> [Hostname=CH2PR14MB4005.namprd14.prod.outlook.com]
    // nodemailer.response: 535 5.7.139 Authentication unsuccessful, the user credentials were incorrect. [CH2PR15CA0029.namprd15.prod.outlook.com]

    if (nodemailer.response.includes('OK')) {
      return res.send({
        user: _.pick(user, ['firstName', 'email', '_id', 'activated', 'GUID']),
      });
    } else {
      return res.send(false);
    }
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
    let user = await User.findOne({ _id: req.body.user_id });

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

/**
 * @description UPDATE user with currentKidID
 */
router.put('/update/:id', auth, async (req, res) => {
  try {
    let user = await User.findById(req.params.id);

    if (!user) {
      return res.status(400).send({ message: 'No User' });
    }

    if (req.body.kidID) {
      user.currentChild = req.body.kidID;
    }

    if (req.body.email) {
      user.email = req.body.email;
      user.firstName = req.body.firstName;
    }
    if (req.body.password) {
      let password = req.body.password;
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    const result = await user.save();

    if (result) res.send(result);
    if (!result) return res.send('Could not update the user.');
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

module.exports = router;
