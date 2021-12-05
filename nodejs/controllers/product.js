const Product = require("../models/product");
const getAll = async (req, res) => {
    let products = await Product.find();
    return res.send(products);
}
const getById = async (req, res) => {
    let { id } = req.params;
    let product = await Product.findById(id);
    if (!product)
        return res.status(404).send("There is no such product");
    return res.send(product);
}
const postProduct = async (req, res) => {
    let product = req.body;
    const url1 = req.protocol + '://' + req.get('host');
    let newProduct = new Product(product);
    newProduct.img = url1 + '/uploads/' + req.file.filename;
    try {
        await newProduct.save();
        return res.send(newProduct);
    }
    catch (err) {
        return res.status(400).send(err.message);
    }
}
const updateProduct = async (req, res) => {
    let productBody = req.body;
    let { id } = req.params;
    let product = await Product.findById(id);
    if (!product)
        return res.status(404).send("There is no such product");
    product.name = productBody.name || product.name;
    product.img = productBody.img || product.img;
    product.quantityInStock = productBody.quantityInStock || product.quantityInStock;
    product.description = productBody.description || product.description;
    try {
        await product.save();
        return res.send(product);
    }
    catch (err) {
        return res.status(400).send(err.message);
    }
}
const deleteProduct = async (req, res) => {
    let { id } = req.params;
    let deleted = await Product.findByIdAndRemove(id);
    if (!deleted)
        return res.status(404).send("There is no such product");
    return res.send(deleted);

}
module.exports = {
    getAll, getById, postProduct, deleteProduct, updateProduct
}