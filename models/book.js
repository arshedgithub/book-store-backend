const mongoose = require("mongoose");
const Joi = require("joi");

const Book = mongoose.model(
  "Books",
  new mongoose.Schema({
    title: {
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
  })
);

function validateBook(book) {
  const schema = Joi.object({
    title: Joi.string().min(1).max(50).required(),
    price: Joi.number().min(0).required(),
  });
  return schema.validate(book);
}

exports.Book = Book;
exports.validate = validateBook;
