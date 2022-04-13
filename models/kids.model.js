const Joi = require('joi');
const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  size: {
    type: String,
  },
  purchased: {
    type: Number,
  },
  used: {
    type: Number,
  },
});

const diaperHistorySchema = new mongoose.Schema({
  date: {
    trim: true,
    type: String,
    maxlength: 10,
  },
  amount: {
    trim: true,
    type: Number,
    maxlength: 2,
  },
});
const kidsSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    minlength: 1,
    maxlength: 99,
  },
  currentChild: {
    type: Boolean,
  },
  brandPreference: {
    type: String,
    trim: true,
    minlength: 1,
    maxlength: 99,
  },
  currentSize: {
    type: String,
  },
  currentSizeLabel: {
    type: String,
  },
  lowAlert: {
    type: String,
  },
  diaperHistory: [diaperHistorySchema],
  totalPurchased: {
    type: Number,
  },
  totalUsed: {
    type: Number,
  },
  inventory: [inventorySchema],
});

const KidsRecordSchema = new mongoose.Schema({
  kids: [kidsSchema],
});

const KidsRecord = mongoose.model('KidsRecord', KidsRecordSchema);

exports.KidsRecord = KidsRecord;
