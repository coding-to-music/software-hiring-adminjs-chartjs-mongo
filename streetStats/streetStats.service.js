const {
  countCandidateByPosition,
  countCandidateByStage,
} = require("../candidate/candidate.model");
const { countPosition } = require("../position/position.model");
const {
  countStreet,
  countStreetByWidth,
  countStreetByWidthBucket,
} = require("../street/street.model");

async function getStreetStats() {
  const candidateByPosition = await countCandidateByPosition();
  const candidateByStage = await countCandidateByStage();
  const positionCount = await countPosition();
  const streetCount = await countStreet();
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
    streetCount,
    streetByWidth,
    streetByWidthBucket,
  };
}

module.exports = {
  getStreetStats,
};
