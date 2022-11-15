const { Router } = require("express");

const {
    getAllProductsByIdCart,
    createCart,
    addProduct,
    deleteProductById,
    deleteAllProducts
  } = require("../controller/CarritoController");

const carritoRouter = Router();


carritoRouter.post(`/`, createCart);
carritoRouter.delete(`/:id`, deleteAllProducts);
carritoRouter.post(`/:idCar/:idProd`,addProduct);
carritoRouter.get(`/:id/products`, getAllProductsByIdCart);
carritoRouter.delete(`/:id/products/:id_prod`, deleteProductById);

module.exports = carritoRouter;