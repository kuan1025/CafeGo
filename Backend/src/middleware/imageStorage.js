const multer = require("multer");
const path = require("path");
const fs = require("fs");


// ref https://expressjs.com/en/resources/middleware/multer.html
// diskStorage

// abs dir !!! 
const uploadDir = path.join(__dirname, '..','..', 'uploads');


if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + "-" + file.originalname);
    },
});

exports.uploadImg = multer({ storage });