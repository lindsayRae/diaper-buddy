const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();

const { UsedRecord } = require('../models/used.model');

/**
 * @description GET used record by size id
 */
router.get('/:id', auth, async (req, res) => {
  let id = req.params.id;
  try {
    const record = await UsedRecord.findOne({ size_id: id });
    if (!record) return res.send({ message: 'Did not find inventory records' });
    else res.send(record);
  } catch (error) {
    res.send({ message: error.message });
  }
});

/**
 * @description called after creating a new kid to set up their empty used inventory
 */
router.post('/:size_id', auth, async (req, res) => {
  let newEntry = {
    size_id: req.params.size_id,
    size: req.body.size,
    used: [],
  };
  let usedRecord = new UsedRecord(newEntry);
  let result = await usedRecord.save();
  res.send(result);
});

/**
 * @description add a used diaper record with size id
 */

router.put('/add/:id', auth, async (req, res) => {
  let sizeId = req.params.id;
  let date = req.body.date;
  try {
    const usedRecord = await UsedRecord.updateOne(
      { size_id: sizeId },
      {
        $push: {
          used: { entryDate: date, count: '1' },
        },
      }
    );

    res.send(usedRecord);
  } catch (error) {
    console.log('error:', error);
    res.send({ message: error.message });
  }
});

module.exports = router;
