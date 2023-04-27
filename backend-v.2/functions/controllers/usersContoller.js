const asyncHandler = require("express-async-handler");
const { admin, db, storage } = require("../config/adminConfig");

const getUsers = asyncHandler(async (req, res) => {
  const response = await admin.auth().listUsers();
  res.status(200).send({ status: "Success", data: response.users });
});

module.exports = {
  getUsers,
};
