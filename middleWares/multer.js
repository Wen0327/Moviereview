// For  uploading files
const multer = require("multer");
const storage = multer.diskStorage({});

// Set this to a function to control which files should be uploaded and which should be skipped.
const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image")) {
    cb("Supported only image files!", false);
  }
// To accept the file pass `true` ,like the next()
  cb(null, true);
};

exports.uploadImage = multer({ storage, fileFilter });
