const { Book, validate } = require("../models/book");
const express = require("express");
const router = express.Router();
const { Category } = require("../models/category");
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");

router.get("/", async (req, res) => {
  const books = await Book.find().sort("name");
  res.send(books);
});

router.post("/", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(400).send("Invalid category");

  const book = new Book({
    name: req.body.name,
    price: req.body.price,
    category: {
      _id: category._id,
      name: category.name,
    },
  });

  await book.save();
  res.send(book);
});

router.put("/:id", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(400).send("Invalid category");

  const book = await Book.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      price: req.body.price,
      category: {
        _id: category._id,
        name: category.name,
      },
    },
    { new: true }
  );

  if (!book)
    return res.status(404).send("The book with the given ID was not found");
  res.send(book);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const book = await Book.findByIdAndRemove(req.params.id);
  if (!book)
    return res.status(404).send("The book with the given ID was not found");
  res.send(book);
});

router.get("/:categoryId", async (req, res) => {
  const category = await Category.findById(req.params.categoryId);
  if (!category)
    return res.status(404).send("The category with the given ID was not found");
  res.send(category);
});

module.exports = router;
