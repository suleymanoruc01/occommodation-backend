const multer = require("multer");
const multerS3 = require("multer-s3");
const s3 = require("../utils/awsS3");

const upload = multer({
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  }),
});

module.exports = upload;
