const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "cover") {
      cb(null, "uploads/covers");
    } else if (file.fieldname === "pdf") {
      cb(null, "uploads/pdf");
    } else {
      cb(null, "uploads");
    }
  },

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const fileName =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;
    cb(null, fileName);
  },
});


const fileFilter = (req, file, cb) => {
  const allowedImage = ["image/jpeg", "image/png", "image/jpg"];
  const allowedPdf = ["application/pdf"];

  if (file.fieldname === "cover" && allowedImage.includes(file.mimetype)) {
    cb(null, true);
  } else if (file.fieldname === "pdf" && allowedPdf.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = upload;
