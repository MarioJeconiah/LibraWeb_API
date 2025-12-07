const Book = require("../models/Book");


exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.getAll();
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mengambil data buku" });
  }
};


exports.getBookById = async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.getById(id);
    if (!book) return res.status(404).json({ message: "Buku tidak ditemukan" });
    res.json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mengambil data buku" });
  }
};


exports.searchBooks = async (req, res) => {
  try {
    const { name, category } = req.query;
    const books = await Book.search({ name, category });
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mencari buku" });
  }
};


exports.createBook = async (req, res) => {
  try {
    const { title, author, year, category } = req.body;
    const cover = req.files?.cover?.[0]?.path || null;
    const pdf = req.files?.pdf?.[0]?.path || null;

    const newBook = await Book.create({ title, author, year, category, cover_path: cover, pdf_path: pdf });
    res.status(201).json({ message: "Buku berhasil ditambahkan", data: newBook });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal menambah buku" });
  }
};


exports.updateBook = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, author, year, category } = req.body;
    const cover = req.files?.cover?.[0]?.path;
    const pdf = req.files?.pdf?.[0]?.path;

    const updated = await Book.update(id, { title, author, year, category, cover_path: cover, pdf_path: pdf });
    if (!updated) return res.status(404).json({ message: "Buku tidak ditemukan" });

    res.json({ message: "Buku berhasil diperbarui", data: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal memperbarui buku" });
  }
};


exports.deleteBook = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Book.delete(id);
    if (!deleted) return res.status(404).json({ message: "Buku tidak ditemukan" });
    res.json({ message: "Buku berhasil dihapus" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal menghapus buku" });
  }
};
