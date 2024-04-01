  const mongoose = require("mongoose");
  const { nullable } = require("zod");
  const ProductSchema = new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
        min: 3,
      },
      summary: {
        type: String,
        required: true,
      },
      description: String,
      slug: {
        type: String,
        unique: true,
        required: true,
      },
      category: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
        default: null,
      },
      price: {
        type: Number,
        min: 1,
        required: true,
      },
      discount: {
        type: Number,
        min: 0,
      },
      afterDis: {
        type: Number,
        min: 0,
      },
      brand: {
        type: mongoose.Types.ObjectId,
        ref: "Brand",
        default: nullable,
      },
      attributes: [
        {
          key: String,
          value: [String],
        },
      ],
      tag: String,
      sellerId: {
        type: mongoose.Types.ObjectId,
        ref: "User"
      },
      image: [String],
      parentId: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
        required: false,
      },
      status: {
        type: String,
        enum: ["active", "inactive"],
        default: "inactive",
      },
      createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        default: null,
      },
    },
    {
      autoCreate: true,
      autoIndex: true,
      timestamps: true,
    }
  );

  const ProductModel = mongoose.model("Product", ProductSchema);
  module.exports = ProductModel;
