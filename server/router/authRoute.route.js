const express = require("express");
const router = express.Router();
const authCtrl = require("../controller/auth.controller");
const { verify } = require("../middleware/verify");

router.post("/user", authCtrl.createUser);
router.post("/login", authCtrl.login);
router.get("/user", verify, authCtrl.getuserInfo);

module.exports = router;
