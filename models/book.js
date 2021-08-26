const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const { categoryShema } = require("./category");

const Book = mongoose.model(
  "Books",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: categoryShema,
      required: true,
    },
  })
);

function validateBook(book) {
  const schema = Joi.object({
    name: Joi.string().min(1).max(50).required(),
    price: Joi.number().min(0).required(),
    categoryId: Joi.objectId().required(),
  });
  return schema.validate(book);
}

exports.Book = Book;
exports.validate = validateBook;
