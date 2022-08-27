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
    if (!record)
      return res.send({
        message: 'Did not find inventory records. Please contact Admin',
      });
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
  let date = req.body.entryDate;
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

/**
 * @description edit/decrease used diaper record with size  - add record by date
 */

router.put('/edit/decrease/:id', auth, async (req, res) => {
  let sizeId = req.params.id;
  let newCount = req.body.newCount;
  let submittedDate = req.body.date;

  try {
    const usedRecord = await UsedRecord.updateOne({ size_id: sizeId }, [
      {
        $addFields: {
          outOfScope: {
            $filter: {
              input: '$used',
              as: 'usedEntry',
              cond: {
                $ne: ['$$usedEntry.entryDate', submittedDate],
              },
            },
          },
          inScope: {
            $filter: {
              input: '$used',
              as: 'usedEntry',
              cond: {
                $eq: ['$$usedEntry.entryDate', submittedDate],
              },
            },
          },
        },
      },
      {
        $addFields: {
          inScopeN: {
            $slice: ['$inScope', newCount], // remaining amount
          },
        },
      },
      {
        $set: {
          used: {
            $concatArrays: ['$outOfScope', '$inScopeN'],
          },
        },
      },
      {
        $unset: ['outOfScope', 'inScope', 'inScopeN'],
      },
    ]);
    res.send(usedRecord);
  } catch (error) {
    console.log('error:', error);
    res.send({ message: error.message });
  }
});

/**
 * @description edit/increase used diaper record with size  - add record by date
 */

router.put('/edit/increase/:id', auth, async (req, res) => {
  let sizeId = req.params.id;

  let startingCount = req.body.startingCount;
  let newCount = req.body.newCount;
  let submittedDate = req.body.date;
  let diff = newCount - startingCount;

  try {
    let obj = {
      entryDate: submittedDate,
      count: 1,
    };

    const usedRecord = await UsedRecord.findOne({ size_id: sizeId });

    let usedData = usedRecord.used;

    for (let i = 0; i < diff; i++) {
      usedData.push(obj);
    }
    // push new usedData into mongo
    usedRecord.save();
    res.send(usedRecord);
  } catch (error) {
    console.log('error:', error);
    res.send({ message: error.message });
  }
});

module.exports = router;
