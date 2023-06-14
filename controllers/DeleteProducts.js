const Cart = require("../model/Cart");
const Product = require("../model/Products");

const deleteProduct = async (req, res) => {
    const { productId } = req.params;
  
    const productInCart = await Cart.findById(productId);
  
    const { title, image, price, _id } = await Product.findOne({
      title: productInCart.title,
    });
  
    await Cart.findByIdAndDelete(productId);
    
    await Product.findByIdAndUpdate(
      _id,
      { inCart: false, title, image, price },
      { new: true }
    )
      .then((product) => {
        res.json({
          menssage: `El producto ${product.name} fue eliminado del carrito`,
        });
      })
      .catch((error) => res.json({ mensaje: "Hubo un error" }));
  };
  
  module.exports = deleteProduct;