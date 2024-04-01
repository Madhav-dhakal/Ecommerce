const { deleteFile } = require("../../config/helpers");
const ProductSvc = require("./product.service");
const productRequest = require("./product.request");

class ProductController {
  createProduct = async (req, res, next) => {
    try {
     console.log("yes bro")
      let payload = new productRequest(req).createTransform();
      payload.slug = await ProductSvc.checkSlug(payload.slug);
      const createdProduct = await ProductSvc.create(payload);
      res.json({
        result: createdProduct,
        message: "product created successfully",
        meta: null,
      });
    } catch (exception) {
      next(exception);
    }
  };
  listForHome = async (req, res, next) => {
    try {
      let {
        filter,
        pagination: { page, limit, skip },
      } = ProductSvc.getFilter(req.query, req.authUser);
      //filter
      // delete filter["$and"]["createdBy"]
      filter = {
        $and: [...filter["$and"], { status: "active" }],
      };
      console.log(filter);
      const count = await ProductSvc.countData(filter);
      const data = await ProductSvc.getData(filter, { limit, skip });
      res.json({
        result: data,
        message: "product fetched successfully",
        meta: {
          page: page,
          total: count,
          limit: limit,
        },
      });
    } catch (exception) {
      next(exception);
    }
  };
  listAllProducts = async (req, res, next) => {
    try {
      const {
        filter,
        pagination: { page, limit, skip },
      } = ProductSvc.getFilter(req.query, req.authUser);
      const count = await ProductSvc.countData(filter);
      const data = await ProductSvc.getData(filter, { limit, skip });
      res.json({
        result: data,
        message: "product fetched successfully",
        meta: {
          page: page,
          total: count,
          limit: limit,
        },
      });
    } catch (exception) {
      next(exception);
    }
  };
  getBySlug = async (req, res, next) => {
    try {
      let filter = {
        slug: req.params.slug,
        status: "active",
      };

      let detail = await ProductSvc.getBySlugWithProduct(filter);
      res.json({
        result: detail,
        message: "product detail fetched ",
        meta: null,
      });
    } catch (except) {
      next(except);
    }
  };
  getById = async (req, res, next) => {
    try {
      let filter = {
        _id: req.params.id,
      };
      filter = {
        ...filter,
        createdBy: req.authUser._id,
      };
      let detail = await ProductSvc.getById(filter);
      res.json({
        result: detail,
        message: "product detail fetched ",
        meta: null,
      });
    } catch (except) {
      next(except);
    }
  };
  updateById = async (req, res, next) => {
    try {
      const product = req.content;
      const payload = new productRequest(req).updateTransform(product);
      const update = await ProductSvc.updateById(req.params.id, payload);
      if (payload.image && update.image && update.image !== payload.image) {
        deleteFile("./public/uploads/product", update.image);
      }
      res.json({
        result: update,
        message: "product updated",
        meta: null,
      });
    } catch (except) {
      next(except);
    }
  };

  deleteById = async (req, res, next) => {
    try {
      let deleted = await ProductSvc.deleteById(req.params.id);
      if (deleted.image) {
        deleteFile("./publc/uploads/product", deleted.image);
      }
      res.json({
        result: deleted,
        message: "product deleted successfully",
        meta: null,
      });
    } catch (except) {
      next(except);
    }
  };
}

const productCtrl = new ProductController();
module.exports = productCtrl;
