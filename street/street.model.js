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
  countMissingLength,
  countMissingWidth,
  countMissingArea,  
  countStreet,
  countStreetByWidth,
  countStreetByWidthBucket,
};

async function countMissingLength() {
  return await Street.count() - 10;
}

async function countMissingWidth() {
  return await Street.count() - 20;
}

async function countMissingArea() {
  return await Street.count() - 30;
}

async function countStreet() {
  return await Street.count();
}

async function countStreetByWidth() {
  const aggregatorOpts = [
    // count by street by width
    {
      $group: {
        _id: "$width",
        count: { $sum: 1 },
      },
    },
  ];

  const data = await Street.aggregate(aggregatorOpts).exec();

  return data;
}

async function countStreetByWidthBucket() {
  const aggregatorOpts = [
    // count by street by width in buckets
    {
      $bucket: {
        groupBy: "$width",
        boundaries: [0, 20, 30, 40, 50, 60, 70, 200],
        default: "other",
        output: {
          count: { $sum: 1 },
          totalLength: { $sum: "$streetLength" },
          totalArea: { $sum: "$area" },
        },
      },
    },
  ];

  const data = await Street.aggregate(aggregatorOpts).exec();

  return data;
}

// db.collection.aggregate([
//   {
//     $bucket: {
//       groupBy: "$value",
//       boundaries: [0, 50, 100],
//       default: "other",
//       output: {
//         count: { $sum: 1 },
//         total: { $sum: "$value" },
//       },
//     },
//   },
// ]);
