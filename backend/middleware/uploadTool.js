const multer = require("multer");
const path = require("path");

const storageTool = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets/images/tools");
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueName + ext);
  },
});

const uploadTool = multer({ storage: storageTool });

module.exports = uploadTool;
