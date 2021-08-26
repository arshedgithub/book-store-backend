const { Book, validate } = require("../models/book");
const express = require("express");
const { Category } = require("../models/category");
const router = express.Router();

router.get("/", async (req, res) => {
  const books = await Book.find().sort("name");
  res.send(books);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(400).send("Invalid category");

  const book = new Book({
    name: req.body.name,
    price: req.body.price,
    category: {
      _id: genre._id,
      name: genre.name,
    },
  });

  await book.save();
  res.send(book);
});

router.put("/:id", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
  const book = await Book.findOneAndUpdate(req.params.id);
  if (!book)
    return res.status(404).send("The book with the given ID was not found");
  res.send(book);
});

router.get("/:id", async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book)
    return res.status(404).send("The book with the given ID was not found");
  res.send(book);
});

module.exports = router;
