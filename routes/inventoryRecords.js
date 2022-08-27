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

/**
 * @description PUT decrement 1 onHand by size id
 */
router.put('/decOnHandOne', auth, async (req, res) => {
  let kidID = req.body.kid_id;
  let size = req.body.size;

  try {
    const record = await InventoryRecord.updateOne(
      { kid_id: kidID },
      {
        $inc: {
          'inventory.$[el].onHand': -1,
        },
      },
      { arrayFilters: [{ 'el.size': size }] }
    );
    res.send(record);
  } catch (error) {
    res.send({ message: error.message });
  }
});

/**
 * @description PUT decrement 'x' onHand by size id (edit mode)
 */
router.put('/decOnHand/:id', auth, async (req, res) => {
  let kidID = req.params.id;
  let sizeId = req.body.sizeId;
  let amt = req.body.removeAmt;

  try {
    const record = await InventoryRecord.updateOne(
      { kid_id: kidID },
      {
        $inc: {
          'inventory.$[el].onHand': -amt,
        },
      },
      { arrayFilters: [{ 'el._id': sizeId }] }
    );
    res.send(record);
  } catch (error) {
    res.send({ message: error.message });
  }
});

/**
 * @description PUT increment onHand by size id (edit mode)
 */
router.put('/incOnHand/:id', auth, async (req, res) => {
  let kidID = req.params.id;
  let sizeId = req.body.sizeId;
  let addAmt = req.body.addAmt;

  try {
    const record = await InventoryRecord.updateOne(
      { kid_id: kidID },
      {
        $inc: {
          'inventory.$[el].onHand': addAmt,
        },
      },
      { arrayFilters: [{ 'el._id': sizeId }] }
    );
    res.send(record);
  } catch (error) {
    res.send({ message: error.message });
  }
});

/**
 * @description GET all purchased inventory by kid_id
 */
router.get('/purchased/:id', auth, async (req, res) => {
  let id = req.params.id;
  try {
    const record = await InventoryRecord.findOne({ kid_id: id });

    if (!record) return res.send({ message: 'Did not find inventory records' });
    else res.send(record.inventory);
  } catch (error) {
    console.log('ERROR:', error);
    res.send({ message: error.message });
  }
});
module.exports = router;
