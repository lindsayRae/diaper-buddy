const mongoose = require('mongoose');

const usedSchema = new mongoose.Schema({
  entryDate: {
    trim: true,
    type: String,
    minlength: 10,
    maxlength: 10,
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
