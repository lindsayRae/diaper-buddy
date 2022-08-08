const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const { KidsRecord } = require('../models/kids.model');
const { InventoryRecord } = require('../models/inventory.model');

/**
 * @description GET get all inventory records by kid id
 */

router.get('/:id', auth, async (req, res) => {
  let id = req.params.id;
  try {
    const record = await InventoryRecord.findOne({ kid_id: id });
    if (!record) return res.send({ message: 'Did not find inventory records' });
    else res.send(record.inventory);
  } catch (error) {
    res.send({ message: error.message });
  }
});

/**
 * @description PUT add purchased diapers to inventory by kid id
 */
router.put('/purchased', auth, async (req, res) => {
  let kidID = req.body.kid_id;
  let purchased = req.body.purchased;
  let size = req.body.size;

  try {
    const record = await InventoryRecord.updateOne(
      { kid_id: kidID },
      {
        $inc: {
          'inventory.$[el].purchased': purchased,
          'inventory.$[el].onHand': purchased,
        },
      },
      { arrayFilters: [{ 'el.size': size }] }
    );
    res.send(record);
  } catch (error) {
    res.send({ message: error.message });
  }
});

const fmtTodayDate = () => {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = today.getFullYear();

  today = mm + '/' + dd + '/' + yyyy;
  return today;
};
/**
 * @description PUT add used diapers to kids inventory
 */
router.put('/used', auth, async (req, res) => {
  let kidID = req.body.kid_id;
  let currentSize = req.body.size;

  let dateNow = fmtTodayDate();
  console.log(dateNow);
  try {
    const kidRecord = await InventoryRecord.updateOne(
      { kid_id: kidID },
      {
        $push: {
          'inventory.$[el].used': { entryDate: dateNow, count: '1' },
        },
        $inc: { 'inventory.$[el].onHand': -1 },
      },
      { arrayFilters: [{ 'el.size': currentSize }] }
    );

    res.send(kidRecord);
  } catch (error) {
    console.log('error:', error);
    res.send({ message: error.message });
  }
});

/**
 * @description GET all purchased inventory by kid_id
 */
//! cannot figure out how to query just for purchased
router.get('/purchased/:id', auth, async (req, res) => {
  let id = req.params.id;
  try {
    const record = await InventoryRecord.findOne({ kid_id: id });
    console.log('RECORD', record.inventory);
    if (!record) return res.send({ message: 'Did not find inventory records' });
    else res.send(record.inventory);
  } catch (error) {
    console.log('ERROR:', error);
    res.send({ message: error.message });
  }
});
module.exports = router;
