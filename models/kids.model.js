const Joi = require('joi');
const mongoose = require('mongoose');

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
    type: Number,
  },
  lowAlert: {
    type: String,
  },
  totalPurchased: {
    type: Number,
  },
  totalUsed: {
    type: Number,
  },
});

const KidsRecordSchema = new mongoose.Schema({
  user_id: { type: String },
  kids: [kidsSchema],
});

const KidsRecord = mongoose.model('KidsRecord', KidsRecordSchema);

function validateKid(kid) {
  console.log('kid in validation', kid);
  const schema = Joi.object({
    firstName: Joi.string().min(1).max(99).required(),
    brandPreference: Joi.string().min(1).max(99).required(),
    currentSize: Joi.number().min(1).max(2).required(),
    lowAlert: Joi.string().min(1).max(20).required(),
    user_id: Joi.string().min(1).max(99).required(),
  });

  const { error, value } = schema.validate(kid);
  return { error, value };
}

exports.KidsRecord = KidsRecord;
exports.validateKid = validateKid;
