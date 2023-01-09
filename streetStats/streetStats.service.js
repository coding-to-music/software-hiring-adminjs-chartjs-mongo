const {
  countCandidateByPosition,
  countCandidateByStage,
} = require("../candidate/candidate.model");
const { countPosition } = require("../position/position.model");
const {
  countHasLength,
  countHasWidth,
  countHasArea,
  countStreet,
  totalLength,
  totalWidth,
  totalArea,
  lengthMiles,
  widthMiles,
  areaAcres,
  countByWidth,
  countByWidthBucket,
  sumWidthbyLength,
  sumWidthbyLengthBucket,
  countStreetByWidth,
  countStreetByWidthBucket,
} = require("../street/street.model");

async function getStreetStats() {
  const candidateByPosition = await countCandidateByPosition();
  const candidateByStage = await countCandidateByStage();
  const positionCount = await countPosition();
  const streetCountHasLength = await countHasLength();
  const streetCountHasWidth = await countHasWidth();
  const streetCountHasArea = await countHasArea();
  const streetCount = await countStreet();

  const streetTotalLength = await totalLength();
  const streetTotalWidth = await totalWidth();
  const streetTotalArea = await totalArea();

  const streetlengthMiles = await lengthMiles();
  const streetwidthMiles = await widthMiles();
  const streetareaAcres = await areaAcres();

  const streetcountByWidth = await countByWidth();
  const streetcountByWidthBucket = await countByWidthBucket();
  const streetsumWidthbyLength = await sumWidthbyLength();
  const streetsumWidthbyLengthBucket = await sumWidthbyLengthBucket();

  const streetByWidth = await countStreetByWidth();
  const streetByWidthBucket = await countStreetByWidthBucket();
  const candidateCount = candidateByPosition
    .map((item) => item.count)
    .reduce((prev, next) => prev + next);
  const hiredCount =
    candidateByStage.find((item) => item._id === "HIRED")?.count || 0;

  return {
    candidateByPosition,
    candidateByStage,
    positionCount,
    candidateCount,
    hiredCount,
    streetCountHasLength,
    streetCountHasWidth,
    streetCountHasArea,
    streetCount,
    streetTotalLength,
    streetTotalWidth,
    streetTotalArea,
    streetlengthMiles,
    streetwidthMiles,
    streetareaAcres,
    streetcountByWidth,
    streetcountByWidthBucket,
    streetsumWidthbyLength,
    streetsumWidthbyLengthBucket,
    streetByWidth,
    streetByWidthBucket,
  };
}

module.exports = {
  getStreetStats,
};
