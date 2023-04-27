const express = require("express");
const router = express.Router();

const {
  setBidding,
  getBiddings,
  //   deleteProduct,
} = require("../controllers/biddingsController");

router.get("/", getBiddings);
router.post("/", setBidding);

module.exports = router;
