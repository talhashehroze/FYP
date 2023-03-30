const express = require("express");
const trendController = require("../Controllers/trendController");
const router = express.Router();

router.get("/get-user", trendController.getTrend);

module.exports = router;
