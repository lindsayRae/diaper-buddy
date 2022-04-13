const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const { KidsRecord } = require('../models/kids.model');

/**
 * @description CREATE child data from setting page
 *
 */
router.post('/', auth, async (req, res) => {
  // const { error } = validateMovementSchema(req.body);

  //if (error) return res.status(400).send({ message: error.details[0].message });
  const id = req.body.user_id;
  const kid = {
    firstName: req.body.firstName,
    brandPreference: req.body.brandPreference,
    currentSize: req.body.currentSize,
    // currentSizeLabel: req.body.currentSizeLabel,
    lowAlert: req.body.lowAlert,
  };
  console.log('kid:', kid);
  try {
    const record = await KidsRecord.findOne({ user_id: id });
    console.log('*****record', record);
    if (!record) {
      res.send({ message: 'Did not find that user.' });
      return;
    }
    //let obj = record.kids;
    //let match = obj.find((e) => e.firstName === kid.firstName);

    record.kids.push(kid);
    let result = await record.save(kid);

    if (!result) {
      res.send({ message: 'Could not add child' });
      return;
    }
    res.send(result);
  } catch (err) {
    res.send({ message: err.message });
  }
});

/**
 * @description edit a child
 *
 */
router.put('/', auth, async (req, res) => {
  let id = req.body.user_id;
  let kidID = req.body._id;
  let newName = req.body.firstName;
  let newBrand = req.body.brandPreference;
  let newSize = req.body.currentSize;
  let newAlert = req.body.lowAlert;

  try {
    let result = await KidsRecord.updateOne(
      { user_id: id, 'kids._id': kidID },
      {
        $set: {
          'kids.$.firstName': newName,
          'kids.$.brandPreference': newBrand,
          'kids.$.currentSize': newSize,
          'kids.$.lowAlert': newAlert,
        },
      }
    );
    console.log('PUT result', result);
    if (!result) {
      res.send({ message: 'No kids for this user.' });
      return;
    }
    res.send(result);
  } catch (error) {
    res.send({ message: error.message });
  }
});

/**
 * @description GET all children
 *
 */

router.get('/:id', auth, async (req, res) => {
  let id = req.params.id;
  try {
    const record = await KidsRecord.findOne({ user_id: id });
    if (!record) {
      res.send({ message: 'Did not find that user.' });
      return;
    }
    res.send(record.kids);
  } catch (err) {
    res.send({ message: err.message });
  }
});

module.exports = router;
