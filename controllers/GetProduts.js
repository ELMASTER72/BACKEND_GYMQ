const Product = require("../model/Products");

const getProducts = async (req, res) => {
  const products = await Product.find();

  if (products) {
    res.json({ products });
  } else {
    res.json({ menssage: "No hay productos" });
  }
};

module.exports = getProducts;