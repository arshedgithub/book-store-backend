const { Genre, validate } = require("../models/category");
const express = require("express");
const { Category } = require("../models/category");
const router = express.Router();

router.get("/", async (req, res) => {
  const categories = await Category.find().sort("name");
  res.send(categories);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = new Category({
    name: req.body.name,
  });

  await category.save();
  res.send(category);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!category)
    return res.status(404).send("The category with given ID was not found.");
  res.send(category);
});

router.delete("/:id", async (req, res) => {
  const category = await Category.findOneAndDelete(req.params.id);
  if (!category)
    return res.status(404).send("The category with given ID was not found.");
  res.send(category);
});

router.get("/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category)
    return res.status(404).send("The category with given ID was not found.");
  res.send(category);
});

module.exports = router;
