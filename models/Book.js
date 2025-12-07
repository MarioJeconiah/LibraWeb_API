const db = require("../config/db");

const Book = {


  getAll: async () => {
    const result = await db.query("SELECT * FROM books ORDER BY id ASC");
    return result.rows;
  },


  getById: async (id) => {
    const result = await db.query("SELECT * FROM books WHERE id = $1", [id]);
    return result.rows[0];
  },


  search: async ({ name, category }) => {
    let query = "SELECT * FROM books WHERE 1=1";
    const params = [];

    if (name) {
      params.push(`%${name}%`);
      query += ` AND title ILIKE $${params.length}`;
    }

    if (category) {
      params.push(`%${category}%`);
      query += ` AND category ILIKE $${params.length}`;
    }

    query += " ORDER BY id ASC";

    const result = await db.query(query, params);
    return result.rows;
  },


  create: async ({ title, author, year, category, cover_path = null, pdf_path = null }) => {
    const result = await db.query(
      `INSERT INTO books (title, author, year, category, cover_path, pdf_path)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [title, author, year, category, cover_path, pdf_path]
    );
    return result.rows[0];
  },


  update: async (id, { title, author, year, category, cover_path, pdf_path }) => {
    const result = await db.query(
      `UPDATE books 
       SET title = $1,
           author = $2,
           year = $3,
           category = $4,
           cover_path = COALESCE($5, cover_path),
           pdf_path = COALESCE($6, pdf_path)
       WHERE id = $7
       RETURNING *`,
      [title, author, year, category, cover_path, pdf_path, id]
    );
    return result.rows[0];
  },


  delete: async (id) => {
    const result = await db.query("DELETE FROM books WHERE id = $1 RETURNING id", [id]);
    return result.rows[0];
  },
};

module.exports = Book;
