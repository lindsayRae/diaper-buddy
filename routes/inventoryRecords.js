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

  console.log('size', currentSize);
  //* date will not work because the model sets the date
  // let dateNow = fmtTodayDate();
  // console.log(dateNow);
  try {
    //* works, but just overwrites the used object
    // const kidRecord = await InventoryRecord.updateOne(
    //   { kid_id: kidID },
    //   {
    //     $set: {
    //       'inventory.$[el].used': { date: dateNow, count: '1' },
    //     },
    //     $inc: { 'inventory.$[el].onHand': -1 },
    //   },
    //   { arrayFilters: [{ 'el.size': size }] }
    // );
    // const document = await InventoryRecord.find({
    //   kid_id: kidID,
    //   //inventory: { $elemMatch: { size: currentSize } },
    // });
    // console.log('document', document);
    // res.send(document[0].inventory[3]);
    // const today = fmtTodayDate();
    // document.inventory.forEach((item) => {
    //   console.log('item: ', item);

    //   if (item.size == size) {
    //     console.log('item size: ', item);
    //     let isTodayUsed = false;
    //     for (let elem of item.used) {
    //       if (elem.date == today) {
    //         elem.count = Number(elem.count) + 1;
    //         isTodayUsed = true;
    //       }
    //     }
    //     if (!isTodayUsed) {
    //       elem.push({ date: today, count: 1 });
    //     }
    //   }
    // });
    // await document.save();

    //res.send(document);
    const document = await InventoryRecord.updateOne(
      {
        kid_id: kidID,
        'inventory.size': currentSize,
        'inventory.used.date': '11/11/21',
      },
      {
        $inc: {
          'inventory.$[size].used.$[usedItem].count': 1,
        },
      },
      {
        arrayFilters: [
          {
            size: {
              eq: '3',
            },
          },
          {
            usedItem: {
              date: '11/11/21',
            },
          },
        ],
      }
    );
    await document.save();

    res.send(document);
  } catch (error) {
    console.log('error:', error);
    res.send({ message: error.message });
  }

  // try {
  //   const record = await InventoryRecord.updateOne(
  //     { kid_id: kidID },
  //     { $inc: { 'inventory.$[el].used': -1 } },
  //     { arrayFilters: [{ 'el.size': size }] }
  //   );
  //   console.log(record);
  //   res.send(record);
  // } catch (error) {
  //   res.send({ message: error.message });
  // }
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
