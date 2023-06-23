const authController = require("../login/controller/userAuthController");

authController.signup(
  "ASalem200@gmail.com",
  "M@rvel0us",
  "admin",
  "Hello, Admin"
);
authController.signup(
  "ASalem400@gmail.com",
  "Wr0ngP@ssw0rd",
  "user",
  "Hello, User"
);
