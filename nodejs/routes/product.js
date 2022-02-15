const express = require("express");
const route = express.Router();
const productController = require("../controllers/product");
const multer = require("multer");
const Product = require("../models/product")
const { v4: uuidv4 } = require('uuid');
const DIR = './uploads/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
       cb(null, DIR);
    },
    filename: (req, file, cb) => {
       const fileName = file.originalname.toLowerCase().split(' ').join('-');
       cb(null, uuidv4() + '-' + fileName)
    }
 });
 
 var upload = multer({
   storage: storage
    // , fileFilter: (req, file, cb) => {
    //    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/pdf") {
    //       cb(null, true);
    //    } else {
    //       cb(null, false);
    //       return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    //    }
    // }
 });
 
 
 route.post("/", productController.postProduct)

 
route.post("/:id",upload.single('img'),async (req, res, next) => {
    const url = req.protocol + '://' + req.get('host') +'/uploads/' + req.file.filename;
    let product = await Product.findById(req.params.id);
    if (!product)
    return res.status(404).send("There is no such product");
    product.name =  product.name;
    product.img = url;
    product.quantityInStock =  product.quantityInStock;
    product.description = product.description;
    try {
        await product.save();
        return res.send(product);
    }
    catch (err) {
        return res.status(400).send(err.message);
    }
})

route.get("/", upload.single('img'),productController.getAll)
route.get("/:id", productController.getById)
route.put("/:id", productController.updateProduct)
route.delete("/:id", productController.deleteProduct)
module.exports = route;