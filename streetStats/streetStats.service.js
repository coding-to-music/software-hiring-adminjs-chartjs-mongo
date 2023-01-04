const {
  countCandidateByPosition,
  countCandidateByStage,
} = require("../candidate/candidate.model");
const { countPosition } = require("../position/position.model");
const {
  countMissingLength,
  countMissingWidth,
  countMissingArea,
  countStreet,
  totalLength,
  totalWidth,
  totalArea,
  countStreetByWidth,
  countStreetByWidthBucket,
} = require("../street/street.model");

async function getStreetStats() {
  const candidateByPosition = await countCandidateByPosition();
  const candidateByStage = await countCandidateByStage();
  const positionCount = await countPosition();
  const streetCountMissingLength = await countMissingLength();
  const streetCountMissingWidth = await countMissingWidth();
  const streetCountMissingArea = await countMissingArea();
  const streetCount = await countStreet();
  
  const streetTotalLength = await totalLength();
  const streetTotalWidth = await totalWidth();
  const streetTotalArea = await totalArea();

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
    streetCountMissingLength,
    streetCountMissingWidth,
    streetCountMissingArea,  
    streetCount,
    streetTotalLength,
    streetTotalWidth,
    streetTotalArea,  
    streetByWidth,
    streetByWidthBucket,
  };
}

module.exports = {
  getStreetStats,
};
