const mongoose = require("mongoose");
const CategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "nie może być puste"],
    },
    // image: {
    //   type: Object,
    //   required: [true, "nie może być puste"],
    // },
  },
  { minimize: false }
);

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
