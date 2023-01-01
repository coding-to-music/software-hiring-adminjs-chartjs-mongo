const express = require("express");
const router = express.Router();
const statsService = require("./streetStats.service");
router.get("/streetstats", async function (req, res, next) {
  try {
    const data = await streetStatsService.getStats();
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
