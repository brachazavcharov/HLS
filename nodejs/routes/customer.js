const express = require("express");
const route = express.Router();
const customerController = require("../controllers/customer");

route.get("/", customerController.getAll)
route.get("/:id", customerController.getById)
route.get("/login/:mail", customerController.getByMail)
route.post("/", customerController.postCustomer)
route.put("/:id", customerController.updateCustomer)
route.delete("/:id", customerController.deleteCustomer)
module.exports = route;