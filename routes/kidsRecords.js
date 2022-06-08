const auth = require('../middleware/auth');
const fetch = require('node-fetch');
const express = require('express');
const router = express.Router();
const { KidsRecord, validateKid } = require('../models/kids.model');
const { InventoryRecord } = require('../models/inventory.model');

/**
 * @description CREATE kid from setting page then the inventory
 *
 */
router.post('/', auth, async (req, res) => {
  const { error } = validateKid(req.body);
  console.log('herezzz');
  console.log(error);
  if (error)
    return res
      .status(400)
      .send({ status: 400, message: error.details[0].message });

  const record = await KidsRecord.findOne({ user_id: req.body.user_id });
  console.log('record', record);
  if (!record) {
    return { message: 'Did not find that user.' };
  }

  if (record.kids.length > 0) {
    let matchFound = await findMatchingName(record.kids, req.body.firstName);
    if (matchFound) {
      return res
        .status(400)
        .send({ message: 'There is already a child under that name.' });
    }
  }

  let newKid = {
    firstName: req.body.firstName,
    brandPreference: req.body.brandPreference,
    currentSize: req.body.currentSize,
    lowAlert: req.body.lowAlert,
  };
  console.log('newKid body', newKid);
  try {
    record.kids.push(newKid);
    let newKidResult = await record.save(newKid);
    console.log('newKidResult', newKidResult);
    if (!newKidResult) {
      res.send({ message: 'Could not add child' });
      return;
    }

    // //? Need to create a header for the creation of the blank you document in inventoryRecord
    let headers = {
      'Content-Type': 'application/json',
    };
    let baseURL = process.env.baseURL;
    let url = `${baseURL}/api/kids/inventorysetup/${
      newKidResult.kids.at(-1)._id
    }`;

    let response = await fetch(url, {
      method: 'POST',
      headers: headers,
    });

    let json = await response.json();
    console.log('json', json);
    if (json) res.send(newKidResult.kids.at(-1));
    else res.send({ message: 'There was an issue, please try again later.' });
  } catch (err) {
    return { message: err.message };
  }
});

const findMatchingName = async (kidArr, newName) => {
  return kidArr.find((x) => x.firstName === newName);
};

/**
 * @description called after creating a new kid to set up their empty inventory
 */
//? Called in create new user to set up empty KidsRecord
router.post('/inventorysetup/:id', async (req, res) => {
  let newKidEntry = {
    kid_id: req.params.id,
    inventory: [
      {
        size: '0',
        purchased: 0,
        used: [],
        onHand: 0,
      },
      {
        size: '1',
        purchased: 0,
        used: [],
        onHand: 0,
      },
      {
        size: '2',
        purchased: 0,
        used: [],
        onHand: 0,
      },
      {
        size: '3',
        purchased: 0,
        used: [],
        onHand: 0,
      },
      {
        size: '4',
        purchased: 0,
        used: [],
        onHand: 0,
      },
    ],
  };
  console.log('newKidEntry', newKidEntry);
  let inventoryRecord = new InventoryRecord(newKidEntry);
  let result = await inventoryRecord.save();
  console.log('result', result);
  res.send(result);
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
 * @description GET specific child by id
 *
 */
router.get('/:user_id/:kid_id', auth, async (req, res) => {
  let id = req.params.user_id;
  let kid_id = req.params.kid_id;

  try {
    const records = await KidsRecord.findOne({ user_id: id });

    if (!records) {
      res.send({ message: 'Did not find that user.' });
      return;
    }
    const record = records.kids.find((x) => x._id == kid_id);

    res.send(record);
  } catch (err) {
    res.send({ message: err.message });
  }
});

/**
 * @description GET all children
 *
 */

router.get('/:user_id', auth, async (req, res) => {
  let id = req.params.user_id;
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

/**
 * @description DELETE a kid by user_id and kidID
 */
router.delete('/:id', auth, async (req, res) => {
  let id = req.params.id;
  let kidID = req.body.kidID;

  console.log('kidID', kidID);
  try {
    let record = await KidsRecord.findOne({ user_id: id });
    console.log('kids record', record);
    let subRecord = record.kids.id(kidID);

    if (subRecord) {
      subRecord.remove();
      record.save();
      res.send({ removed: true });
    } else {
      res.send({ message: 'Record not found. Could not delete.' });
    }
  } catch (error) {
    res.send({ message: error.message });
  }
});

/**
 * @description PUT add diapers to kids inventory
 */
router.put('/update', auth, async (req, res) => {
  let id = req.body.user_id;
  let kidID = req.body.kids_id;
  let purchased = req.body.purchased;
  let inventoryID = req.body.inventory_id;

  try {
    const record = await KidsRecord.updateOne(
      {
        user_id: id,
      },
      {
        $inc: {
          'kids.$[kids].inventory.$[inventory].purchased': purchased,
        },
      },
      {
        multi: false,
        upsert: false,
        arrayFilters: [
          {
            'kids._id': {
              $eq: kidID,
            },
          },
          {
            'inventory._id': {
              $eq: inventoryID,
            },
          },
        ],
      }
    );

    if (!record) {
      res.send({ message: 'No kids for this user.' });
      return;
    }
    res.send(record);
  } catch (error) {
    res.send({ message: error.message });
  }
});

router.put('/update/adddiaper', auth, async (req, res) => {});
module.exports = router;
