const busboy = require("busboy");
const fs = require("fs");
const path = require("path");
const os = require("os");
const { admin, storage } = require("../config/adminConfig");

exports.upload = function (req, res) {
  let bb = busboy({ headers: req.headers });

  let fields = {};

  let imageFileName = {};
  let imagesToUpload = [];
  let imageToAdd = {};
  let imageUrls = [];

  bb.on("field", (fieldname, fieldvalue) => {
    fields[fieldname] = fieldvalue;
  });

  bb.on("file", (fieldname, file, filename, encoding, mimetype) => {
    if (
      filename.mimeType === "image/jpeg" ||
      filename.mimeType === "image/png"
    ) {
      console.log(filename);
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
      await Promise.all(promises);

      //   return response.json({
      //     message: `Images URL: ${imageUrls}`,
      //   });
    } catch (err) {
      console.log(err);
      //   response.status(500).json(err);
    }
  });

  bb.end(req.rawBody);
  //   req.pipe(bb);
};
