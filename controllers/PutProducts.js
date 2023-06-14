const Cart = require("../model/Cart");


const putProduct = async (req, res) => {
    const { productId } = req.params;
    const { query } = req.query;
    const body = req.body;

    const find_Products = await Cart.findById(productId);

    if (!query) {
      res.status(404).json({ mensaje: "Debes enviar una query" });
  
      /* Si esta el producto en el carrito y quiero agregar */
    } else if (find_Products && query === "add") {
      body.amount = body.amount + 1;
  
      await Cart.findByIdAndUpdate(productId, body, {
        new: true,
      }).then((product) => {
        res.json({
          mensaje: `El producto: ${product.title} fue actualizado`,
          product,
        });
      });
  
      /* Si esta el producto en el carrito y quiero sacar */
    } else if (find_Products && query === "del") {
      body.amount = body.amount - 1;
  
      await Cart.findByIdAndUpdate(productId, body, {
        new: true,
      }).then((product) =>
        res.json({
          mensaje: `El producto: ${product.title} fue actualizado`,
          product,
        })
      );
    } else {
      res.status(400).json({ mensaje: "Ocurrio un error" });
    }
  };
  
  module.exports = putProduct;