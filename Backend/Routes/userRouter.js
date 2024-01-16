const express = require("express");
const router = express.Router();
const usercontroller = require("../Controller/userController");

router.route("/register").post(usercontroller.registerUser);

module.exports = router;
