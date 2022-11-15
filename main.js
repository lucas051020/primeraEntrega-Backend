const express = require(`express`);
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routers import
const productosRouter = require("./routes/productoRouter");
const carritoRouter = require("./routes/carritoRouter");

//Routers
app.use(`/api/products`, productosRouter);
app.use(`/api/shoppingcart`, carritoRouter);

app.use((req, res, next) => {
    res.status(404).json({ error: -1, descripcion: `ruta ${req.originalUrl} metodo ${req.method} no implementada` });
});

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

server.on(`error`, err => console.log(`error en el servidor ${err}`));