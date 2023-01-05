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
  totalLength,
  totalWidth,
  totalArea,
  countStreetByWidth,
  countStreetByWidthBucket,
};

// candidateByPosition,
// candidateByStage,
// positionCount,
// candidateCount,
// hiredCount,
// streetCountMissingLength,
// streetCountMissingWidth,
// streetCountMissingArea,
// streetCount,
// streetTotalLength,
// streetTotalWidth,
// streetTotalArea,
// streetByWidth,
// streetByWidthBucket,

const sumColumn = async (collection, column, where) => {
  const pipeline = [
    {
      $match: where,
    },
    {
      $group: {
        _id: null,
        sum: { $sum: `$${column}` },
      },
    },
  ];

  // const [result] = await collection.aggregate(pipeline).toArray();
  const cursor = collection.aggregate(pipeline);

  // const [result] = cursor.toArray();

  // return result.sum;
  return 123;
};

// Example usage
// const total = await sumColumn(Street, "streetLength", { width: 30 });
// console.log(total);

async function countMissingLength() {
  return await sumColumn(Street, "streetLength", { width: 30 });
  // return (await Street.count()) - 10;
}

async function countMissingWidth() {
  return await sumColumn(Street, "width", { width: 0 });
  // return (await Street.count()) - 20;
}

async function countMissingArea() {
  return await sumColumn(Street, "area", { area: 0 });
  // return (await Street.count()) - 30;
}

async function countStreet() {
  return await Street.count();
}

async function totalLength() {
  return await sumColumn(Street, "streetLength", { width: 30 });
  // return (await Street.count()) - 40;
}

async function totalWidth() {
  return await sumColumn(Street, "width", { width: 30 });
  // return (await Street.count()) - 50;
}

async function totalArea() {
  return await sumColumn(Street, "area", { area: 30 });
  // return (await Street.count()) - 60;
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
