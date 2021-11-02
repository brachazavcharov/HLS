const RecommendedProducts = require("../models/recommendedProducts");
const getAll = async (req, res) => {
    let recommendedProducts = await RecommendedProducts.find();
    return res.send(recommendedProducts);
}
const getById = async (req, res) => {
    let { id } = req.params;
    let recommendedProducts = await RecommendedProducts.findById(id);
    if (!recommendedProducts)
        return res.status(404).send("There is no such product");
    return res.send(recommendedProducts);
}
const postRecommendedProduct = async (req, res) => {
    let recommendedProducts = req.body;
    let newRecommendedProducts = new RecommendedProducts(recommendedProducts);
    try {
        await newRecommendedProducts.save();
        return res.send(newRecommendedProducts);
    }
    catch (err) {
        return res.status(400).send(err.message);
    }
}
const updateRecommendedProduct = async (req, res) => {
    let recommendedProductsBody = req.body;
    let { id } = req.params;
    let recommendedProducts = await RecommendedProducts.findById(id);
    if (!recommendedProducts)
        return res.status(404).send("There is no such product");
    recommendedProducts.customerId = recommendedProductsBody.customerId || recommendedProducts.customerId;
    recommendedProducts.productId = recommendedProductsBody.productId || recommendedProducts.productId;
    recommendedProducts.comment = recommendedProductsBody.comment || recommendedProducts.comment;
    try {
        await recommendedProducts.save();
        return res.send(recommendedProducts);
    }
    catch (err) {
        return res.status(400).send(err.message);
    }
}
const deleteRecommendedProduct = async (req, res) => {
    let { id } = req.params;
    let deleted = await RecommendedProducts.findByIdAndRemove(id);
    if (!deleted)
        return res.status(404).send("There is no such product");
    return res.send(deleted);
}
module.exports = {
    getAll, getById, postRecommendedProduct, deleteRecommendedProduct, updateRecommendedProduct
}