const express = require("express");
const router = express.Router();
const statsService = require("./streetStats.service");
router.get("/streetstats", async function (req, res, next) {
  try {
    console.log("streetStats.route.js about to call getStreetStats");
    const data = await streetStatsService.getStreetStats();
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
