const db = require("../config/db");

// GET all categories
const getAllCategories = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM categories ORDER BY id DESC");
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
};

// ADD new category
const addCategory = async (req, res) => {
  const { category_name, category_type } = req.body;

  if (!category_name || !category_type) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO categories (category_name, category_type) VALUES (?, ?)",
      [category_name, category_type]
    );
    res.status(201).json({ message: "Category added", id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: "Error adding category", error });
  }
};

// UPDATE category
const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { category_name, category_type } = req.body;

  try {
    await db.query(
      "UPDATE categories SET category_name = ?, category_type = ? WHERE id = ?",
      [category_name, category_type, id]
    );
    res.status(200).json({ message: "Category updated" });
  } catch (error) {
    res.status(500).json({ message: "Error updating category", error });
  }
};

// DELETE category
const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM categories WHERE id = ?", [id]);
    res.status(200).json({ message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting category", error });
  }
};

module.exports = {
  getAllCategories,
  addCategory,
  updateCategory,
  deleteCategory,
};
