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
      { $inc: { 'inventory.$[el].purchased': purchased } },
      { arrayFilters: [{ 'el.size': size }] }
    );
    console.log(record);
    res.send(record);
  } catch (error) {
    res.send({ message: error.message });
  }
});

/**
 * @description PUT add used diapers to kids inventory
 */
router.put('/used', auth, async (req, res) => {
  let kidID = req.body.kid_id;
  let size = req.body.size;

  try {
    const record = await InventoryRecord.updateOne(
      { kid_id: kidID },
      { $inc: { 'inventory.$[el].used': -1 } },
      { arrayFilters: [{ 'el.size': size }] }
    );
    console.log(record);
    res.send(record);
  } catch (error) {
    res.send({ message: error.message });
  }
});

/**
 * @description PUT add used diapers to kids inventory
 */
// router.put('/used', auth, async (req, res) => {
//   let id = req.body.user_id;
//   let kidID = req.body.kids_id;
//   let used = req.body.used;
//   let inventoryID = req.body.inventory_id;
//   let date = req.body.date;

//   try {
//     const record = await KidsRecord.updateOne(
//       {
//         user_id: id,
//       },
//       {
//         $inc: {
//           'kids.$[kids].inventory.$[inventory].used': used,
//         },
//       },
//       {
//         multi: false,
//         upsert: false,
//         arrayFilters: [
//           {
//             'kids._id': {
//               $eq: kidID,
//             },
//           },
//           {
//             'inventory._id': {
//               $eq: inventoryID,
//             },
//           },
//         ],
//       }
//     );

//     if (!record) {
//       res.send({ message: 'No kids for this user.' });
//       return;
//     }
//     res.send(record);
//   } catch (error) {
//     res.send({ message: error.message });
//   }
// });
module.exports = router;
