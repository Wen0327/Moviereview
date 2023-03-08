// For  uploading files
const multer = require("multer");
const storage = multer.diskStorage({});

// Set this to a function to control which files should be uploaded and which should be skipped.
const imageFileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image")) {
    cb("Supported only image files!", false);
  }
  // To accept the file pass `true` ,like the next()
  cb(null, true);
};

// Set this to a function to control which files should be uploaded and which should be skipped.
const videoFileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("video")) {
    cb("Supported only video files!", false);
  }
  // To accept the file pass `true` ,like the next()
  cb(null, true);
};

exports.uploadImage = multer({ storage, fileFilter: imageFileFilter });
exports.uploadVideo = multer({ storage, fileFilter: videoFileFilter });
