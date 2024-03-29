const mongoose = require('mongoose');

// const usedSchema = new mongoose.Schema({
//   entryDate: {
//     trim: true,
//     type: String,
//   },
//   count: {
//     trim: true,
//     type: Number,
//   },
// });
const inventorySchema = new mongoose.Schema({
  size: {
    type: String,
  },
  purchased: {
    type: Number,
  },
  //used: [usedSchema],
  onHand: {
    type: Number,
  },
});

const InventoryRecordSchema = new mongoose.Schema({
  kid_id: { type: String },
  inventory: [inventorySchema],
});

const InventoryRecord = mongoose.model(
  'InventoryRecord',
  InventoryRecordSchema
);

exports.InventoryRecord = InventoryRecord;
