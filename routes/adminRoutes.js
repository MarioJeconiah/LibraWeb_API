const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const auth = require("../middleware/auth");

router.post("/login", adminController.login);
router.get("/check", auth, (req, res) => {
  res.json({ message: "Admin authenticated" });
});

module.exports = router;
