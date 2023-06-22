const express = require("express");
const router = express.Router();
const authController = require("../controller/userAuthController");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.post("/login", authController.login);

module.exports = router;
