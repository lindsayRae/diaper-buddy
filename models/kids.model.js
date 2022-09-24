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
    type: String,
  },
  lowAlert: {
    type: String,
  },
  lowAlertSent: {
    type: Boolean,
  },
  totalPurchased: {
    type: Number,
  },
  totalUsed: {
    type: Number,
  },
  imageName: {
    type: String,
    trim: true,
  },
});

const KidsRecordSchema = new mongoose.Schema({
  user_id: { type: String },
  kids: [kidsSchema],
});

const KidsRecord = mongoose.model('KidsRecord', KidsRecordSchema);

function validateKid(kid) {
  const schema = Joi.object({
    firstName: Joi.string().min(1).max(99).required(),
    brandPreference: Joi.string().min(1).max(99).required(),
    currentSize: Joi.string().required(),
    lowAlert: Joi.string().min(1).max(20).required(),
    user_id: Joi.string().min(1).max(99).required(),
  });

  const { error } = schema.validate(kid);
  return { error };
}

exports.KidsRecord = KidsRecord;
exports.validateKid = validateKid;
