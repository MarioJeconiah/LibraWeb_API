const db = require("../config/db");

const Admin = {

  findByUsername: async (username) => {
    const result = await db.query(
      "SELECT * FROM admins WHERE username = $1",
      [username]
    );
    return result.rows[0];
  },


  create: async ({ username, password }) => {
    const result = await db.query(
      `INSERT INTO admins (username, password)
       VALUES ($1, $2)
       RETURNING *`,
      [username, password]
    );
    return result.rows[0];
  },
};

module.exports = Admin;
