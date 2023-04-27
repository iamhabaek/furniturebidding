const asyncHandler = require("express-async-handler");
const { admin, db, storage } = require("../config/adminConfig");
const crypto = require("crypto");
const id = crypto.randomBytes(16).toString("hex");

const getOrders = asyncHandler(async (req, res) => {
  const query = db.collection("orders");
  let response = [];
  await query.get().then((data) => {
    const docs = data.docs;
    docs.map((doc) => {
      response.push(doc.data());
    });
    return response;
  });
  res.status(200).send({ status: "Success", data: response });
});

const setOrder = asyncHandler(async (req, res) => {
  const order = {
    id: req.body.id,
    productId: req.body.productId,
    userId: req.body.userId,
    isPaid: req.body.isPaid,
    amountToPay: req.body.amountToPay,
    created: req.body.created,
  };
  await db.collection("orders").doc(order.id).create(order);
  res.status(200).send({ status: "Success", data: order });
});
const updateOrder = asyncHandler(async (req, res) => {
  const order = {
    amountToPay: req.body.amountToPay,
  };
  const docRef = db.collection("orders").doc(req.params.id);
  await docRef.update(order);
  res.status(200).send({ status: "Success", data: order });
});
module.exports = {
  getOrders,
  setOrder,
  updateOrder,
};
