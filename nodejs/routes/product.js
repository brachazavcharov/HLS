const express = require("express");
const route = express.Router();
const productController = require("../controllers/product");
const multer = require("multer");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {

        cb(null, new Date().toDateString() + file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        cb(null, true);
    } else {
        cb(null, false);
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
}

const upload = multer({
    storage: storage, limits: {
        fileSize: 1024 * 1024 * 5
    }
    , fileFilter: fileFilter
});

route.get("/", upload.single('img'),productController.getAll)
route.get("/:id", productController.getById)
route.post("/",upload.single('img'), productController.postProduct)
route.put("/:id", productController.updateProduct)
route.delete("/:id", productController.deleteProduct)
module.exports = route;