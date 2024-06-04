const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please add a name"],
      default: "Product Name",
      trim: true,
    },
    sku: {
      type: String,
      required: true,
      default: "SKU",
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Please add a category"],
      default: "Bahan",
      trim: true,
    },
    quantity: {
      type: String,
      required: [true, "Please add a quantity"],
      default: 1,
      trim: true,
    },
    price: {
      type: String,
      required: [true, "Please add a price"],
      default: 0,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
      default: "Nothing",
      trim: true,
    },
    image: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
