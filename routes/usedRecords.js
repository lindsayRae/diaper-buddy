const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();

const { UsedRecord } = require('../models/used.model');

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

module.exports = router;
