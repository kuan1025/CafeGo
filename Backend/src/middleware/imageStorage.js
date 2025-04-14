const multer = require("multer");


// ref https://expressjs.com/en/resources/middleware/multer.html
// diskStorage

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + "-" + file.originalname);
    },
});

exports.uploadImg = multer({ storage });