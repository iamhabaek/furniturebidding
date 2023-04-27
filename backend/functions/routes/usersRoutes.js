const express = require("express");
const router = express.Router();

const { getUsers } = require("../controllers/usersContoller");

router.get("/", getUsers);
module.exports = router;
