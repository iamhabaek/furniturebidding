const express = require("express");
const router = express.Router();

const {
  setProduct,
  getProducts,
  deleteProduct,
} = require("../controllers/productsController");

router.get("/", getProducts);
router.post("/", setProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
