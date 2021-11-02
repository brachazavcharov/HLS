const express = require("express");
const route = express.Router();
const orderController = require("../controllers/order");

route.get("/", orderController.getAll)
route.get("/:id", orderController.getById)
route.post("/", orderController.postOrder)
route.put("/:id", orderController.updateOrder)
route.delete("/:id", orderController.deleteOrder)
module.exports = route;

