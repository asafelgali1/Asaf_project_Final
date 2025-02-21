const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

//  רישום והתחברות *ללא צורך בטוקן*
router.post("/", userController.register); 
router.post("/login", userController.login);

module.exports = router;
