const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");


router.get("/filter", bookController.searchBooks);


router.get("/", bookController.getAllBooks);


router.get("/:id", bookController.getBookById);


router.post(
  "/",
  auth,
  upload.fields([
    { name: "cover", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
  ]),
  bookController.createBook
);


router.put(
  "/:id",
  auth,
  upload.fields([
    { name: "cover", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
  ]),
  bookController.updateBook
);


router.delete("/:id", auth, bookController.deleteBook);

module.exports = router;
