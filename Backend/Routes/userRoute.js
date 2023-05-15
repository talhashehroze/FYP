const express = require("express");
const userController = require("../Controllers/userController");
const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/get-user", userController.getUser);
router.get("/predict-user", userController.predictUser);
router.get("/trendQA", userController.analyzeTrend);

// router.post("/get-user-with-email", userController.getUserWithMail);

module.exports = router;
