const { app } = require("firebase-admin");
const admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://furniturebidding-68086.appspot.com",
});

const db = admin.firestore();
const storage = admin.storage();
module.exports = {
  db,
  admin,
  storage,
};
