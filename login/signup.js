const authController = require("../login/controller/userAuthController");

authController.signup("admin", "M@rvel0us", "admin", "Hello, Admin");
authController.signup("user", "user", "user", "Normal, User");
