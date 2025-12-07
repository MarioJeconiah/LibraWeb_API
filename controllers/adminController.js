const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findByUsername(username);

    if (!admin) {
      return res.status(400).json({ message: "Username tidak ditemukan" });
    }

    if (password !== admin.password) {
      return res.status(400).json({ message: "Password salah" });
    }

    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      process.env.JWT_SECRET
    );

    res.json({
      message: "Login berhasil",
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error login" });
  }
};
