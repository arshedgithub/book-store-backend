const mongoose = require("mongoose");
const Joi = require("joi");

const categoryShema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
  },
});

const Category = mongoose.model("Categories", categoryShema);

function validateCategory(category) {
  const schema = Joi.object({
    name: Joi.string().min(1).max(50).required(),
  });
  return schema.validate(category);
}

exports.categoryShema = categoryShema;
exports.Category = Category;
exports.validate = validateCategory;
