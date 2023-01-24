const mongoose = require("mongoose");
const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "nie może być puste"],
    },
    description: {
      type: String,
      required: [true, "nie może być puste"],
    },
    price: {
      type: String,
      required: [true, "nie może być puste"],
    },
    category: {
      type: String,
      required: [true, "nie może być puste"],
    },
    pictures: {
      type: Array,
      required: true,
    },
  },
  { minimize: false }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
