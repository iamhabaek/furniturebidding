const asyncHandler = require("express-async-handler");
const busboy = require("busboy");
const fs = require("fs");
const path = require("path");
const os = require("os");
const { admin, db, storage } = require("../config/adminConfig");
const crypto = require("crypto");
const id = crypto.randomBytes(16).toString("hex");

const getProducts = asyncHandler(async (req, res) => {
  const query = db.collection("products");
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
const setProduct = asyncHandler(async (req, res) => {
  let bb = busboy({ headers: req.headers });

  let fields = {};
  let docId = "";
  let imageFileName = {};
  let imagesToUpload = [];
  let imageToAdd = {};
  let imageUrls = [];
  bb.on("field", (fieldname, fieldvalue) => {
    fields[fieldname] = fieldvalue;
    console.log(fieldname, fieldvalue);
  });

  bb.on("file", (fieldname, file, filename, encoding, mimetype) => {
    if (
      filename.mimeType === "image/jpeg" ||
      filename.mimeType === "image/png"
    ) {
      console.log(filename);
      console.log(req.headers);

      // Getting extension of any image
      const imageExtension = filename.filename.split(".")[1];
      // console.log(file);
      // // Setting filename
      imageFileName = `${Math.round(
        Math.random() * 1000000000
      )}.${imageExtension}`;

      // Creating path
      const filepath = path.join(os.tmpdir(), imageFileName);
      imageToAdd = {
        imageFileName,
        filepath,
        mimetype,
      };

      file.pipe(fs.createWriteStream(filepath));
      //Add the image to the array
      imagesToUpload.push(imageToAdd);
    } else {
      console.log("wrong type submitted");
    }
  });

  bb.on("finish", async () => {
    let promises = [];

    imagesToUpload.forEach((imageToBeUploaded) => {
      imageUrls.push(
        `https://firebasestorage.googleapis.com/v0/b/${
          storage.bucket().name
        }/o/${imageToBeUploaded.imageFileName}?alt=media`
      );
      fields.productImages = imageUrls;
      promises.push(
        storage.bucket().upload(imageToBeUploaded.filepath, {
          resumable: false,
          metadata: {
            metadata: {
              contentType: imageToBeUploaded.mimetype,
            },
          },
        })
      );
    });
    try {
      console.log(fields);
      // const product = {
      //   ...fields,
      //   id: id
      // };
      await db.collection("products").doc(fields.id).set(fields);
      await Promise.all(promises);
      res.status(200).send({
        message: `Images URL: ${imageUrls}`,
        data: fields,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  bb.end(req.rawBody);
});

const deleteProduct = asyncHandler(async (req, res) => {
  const docRef = db.collection("products").doc(req.params.id);
  await docRef.delete();
  res.status(200).send({ message: `Product ${req.params.id} deleted` });
});
module.exports = {
  setProduct,
  getProducts,
  deleteProduct,
};
