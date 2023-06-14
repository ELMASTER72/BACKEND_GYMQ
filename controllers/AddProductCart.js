const Cart = require("../model/Cart");
const Product = require("../model/Products");

const addProductCart = async (req,res) => {
    const {title, image, price} = req.body;

    const find_Products = await Product.findOne({ title });

    const notempty = title !== "" && image !== "" && price !== "";

    const intheCart = await Cart.findOne({title});

    if(!find_Products){
        res.status(400).json({
            message: "Este producto no se encuentra en nuestra base de datos"
        });
    }else if (notempty && !intheCart){
        const newProductInCart = new Cart({ title, image, price, amount: 1 });

        await Product.findByIdAndUpdate(
            find_Products?._id,
            {inCart: true, title, image, price},
            {new: true}
        )
        .then((product) => {
            newProductInCart.save();
            res.json({
              menssge: `El producto fue agregado al carrito`,
              product,
            });
          })
          .catch((error) => console.error(error));
    }else if (intheCart){
        res.status(400).json({
            message: "El producto ya esta en el carrito",
        });
    }
};

module.exports = addProductCart;