const express = require("express");
const route = express.Router();
const recommendedProductsController = require("../controllers/recommendedProducts");

route.get("/", recommendedProductsController.getAll)
route.get("/:id", recommendedProductsController.getById)
route.post("/", recommendedProductsController.postRecommendedProduct)
route.put("/:id", recommendedProductsController.updateRecommendedProduct)
route.delete("/:id", recommendedProductsController.deleteRecommendedProduct)
module.exports = route;