const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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

module.exports = {
  StreetSchema,
  Street,
  countHasLength,
  countHasWidth,
  countHasArea,
  countStreet,
  totalLength,
  totalWidth,
  totalArea,
  countStreetByWidth,
  countStreetByWidthBucket,
};

async function countHasLength() {
  return await Street.find({ streetLength: { $gt: 0 } }).count();
}

async function countHasWidth() {
  return await Street.find({ width: { $gt: 0 } }).count();
}

async function countHasArea() {
  return await Street.find({ area: { $gt: 0 } }).count();
}

async function countStreet() {
  return await Street.count();
}

async function totalLength() {
  const data = await Street.aggregate([
    { $group: { _id: null, aggregateValue: { $sum: "$streetLength" } } },
  ]);
  return data[0].aggregateValue;
}

async function totalWidth() {
  const data = await Street.aggregate([
    { $group: { _id: null, aggregateValue: { $sum: "$width" } } },
  ]);
  return data[0].aggregateValue;
}

async function totalArea() {
  const data = await Street.aggregate([
    { $group: { _id: null, aggregateValue: { $sum: "$area" } } },
  ]);
  return data[0].aggregateValue;
}

async function countStreetByWidth() {
  const aggregatorOpts = [
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
