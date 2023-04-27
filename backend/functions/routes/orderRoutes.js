const express = require("express");
const router = express.Router();
const {
  setOrder,
  getOrders,
  updateOrder,
  //   deleteProduct,
} = require("../controllers/ordersControllers");

router.get("/", getOrders);
router.post("/", setOrder);
router.put("/:id", updateOrder);

module.exports = router;
