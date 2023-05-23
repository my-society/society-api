const mongoose = require('mongoose');
const Joi = require('joi');

const houseHelpSchema = new mongoose.Schema({
  firstName: { type: String, required: true, lowercase: true, min: 3, max: 15 },
  lastName: { type: String, required: true, lowercase: true, min: 3, max: 15 },
  phone: { type: String, required: true, min: 9, max: 10 },
  worksAt: [String],
  duties: {
    type: String,
    enum: ['diswashing', 'cleaning', 'dusting', 'cooking'],
  },
});
function validateHouseHelp(houseHelp) {
  const schema = Joi.object({
    firstName: Joi.string().lowercase().min(3).max(15).required(),
    lastName: Joi.string().lowercase().min(3).max(15).required(),
    phone: Joi.string().lowercase().length(10).required(),
    worksAt: Joi.array().items(Joi.string()),
    duties: Joi.array().items(Joi.string().valid('dishwashing', 'cleaning', 'dusting', 'cooking')),
  });
  return schema.validate(houseHelp);
}

const HouseHelp = mongoose.model('HouseHelp', houseHelpSchema);

module.exports = { HouseHelp, validateHouseHelp };

// todo
// change phone .length to 10
// duties can be array
// gender
// change add primary and secondary phone
// worksAt set to apartment object
// report entry time
