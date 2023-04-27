const asyncHandler = require("express-async-handler");
const { admin, db, storage } = require("../config/adminConfig");
const crypto = require("crypto");
const id = crypto.randomBytes(16).toString("hex");

const getBiddings = asyncHandler(async (req, res) => {
  const query = db.collection("biddings");
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

const setBidding = asyncHandler(async (req, res) => {
  const bidding = {
    productId: req.body.productId,
    userId: req.body.userId,
    bidAmount: req.body.bidAmount,
    created: req.body.created,
    id: req.body.id,
  };
  await db.collection("biddings").doc(bidding.id).create(bidding);
  res.status(201).send({ message: "Success", data: bidding });
});

module.exports = {
  getBiddings,
  setBidding,
};
