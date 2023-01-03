// const mongoose = require('mongoose');
// const PositionSchema = new mongoose.Schema({
//     name: { type: String },
// });

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const bcrypt = require("bcrypt");

const StreetSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  fromStreet: {
    type: String,
    required: false,
  },
  to: {
    type: String,
    required: false,
  },
  width: {
    type: Number,
    required: false,
  },
  streetLength: {
    type: Number,
    required: false,
  },
  streetDate: {
    type: Number,
    required: false,
  },
  noncity: {
    type: String,
    required: false,
  },
  unnacceptedlength: {
    type: String,
    required: false,
  },
  area: {
    type: Number,
    required: false,
  },
});

const Street = mongoose.model("Street", StreetSchema);

// module.exports = Street;

module.exports = {
  StreetSchema,
  Street,
  countStreet,
};

async function countStreet() {
  return await Street.count();
}
