const mongoose = require('mongoose');

const usedSchema = new mongoose.Schema({
  date: {
    type: Date,
  },
  count: {
    type: Number,
  },
});

const UsedRecordSchema = new mongoose.Schema({
  kid_id: { type: String },
  size_id: { type: String },
  size: {
    type: Number,
  },
  used: [usedSchema],
});

const UsedRecord = mongoose.model('UsedRecord', UsedRecordSchema);

exports.UsedRecord = UsedRecord;
