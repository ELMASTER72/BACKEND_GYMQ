const getProducts = require("../../controllers/GetProduts");
const getProductsCart = require("../../controllers/GetProductsCart");
const addProductCart = require("../../controllers/AddProductCart");
const putProduct = require("../../controllers/PutProducts");
const deleteProduct = require("../../controllers/DeleteProducts");

module.exports = {
  getProducts,
  getProductsCart,
  addProductCart,
  putProduct,
  deleteProduct,
};
