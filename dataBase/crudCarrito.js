const { promises: fs } = require('fs')

class Contenedor {
    constructor(archivo) {
        this.archivo = archivo;
    }

    async write(datos, msg) {
        try {
            await fs.writeFile(`./${this.archivo}`, JSON.stringify(datos, null, 2));
            console.log(msg);
        } catch (err) {
            throw Error(`Error al escribir en el archivo ${err}`);
        }
    }

    async createCart() {
        let newCart;
        let cart = {
            id: 0,
            products: []
        };
        let datos = await this.getAll();

        if (datos.length == 0) {
            cart.id = 1;
            newCart = cart;
        } else {
            cart.id = datos[datos.length - 1].id + 1;
            newCart = cart;
        }
        datos.push(newCart);

        await this.write(datos, `Agregado!`);

        return cart.id;
    }

    async getProductsByID(idCart) {

        let datos = await this.getAll();
        let result = datos.filter(cart => cart.id == idCart);
        
        if (result.length == 0) {
            return [];
        } else {
            return result[0].products;
        }
    }

    async getCartById(myId) {
        let datos = await this.getAll();
        let result = datos.filter(cart => cart.id == myId);

        return result;
    }

    async getAll() {
        try {
            const file = await fs.readFile(this.archivo, 'utf-8')
            const elements = JSON.parse(file)
            return elements;

        } catch (err) {
            throw Error(`Error al leer el archivo ${err}`);
        }
    }

    async deleteProductById(idC, idP) {
        try {
            let datos = await this.getAll();

            let cart = datos.find(cart => cart.id == idC);
            let product = cart.products.find(product => product.id == idP);

            if (cart && product) {
                let indexProduct = cart.products.indexOf(product);
                cart.products.splice(indexProduct, 1);
                await this.write(datos, `Producto  con ID: ${idP} del carrito con ID ${idC} fue eliminado`);
            } else {
                if (!cart) {
                    throw Error(`Error el carrito no existe`);
                }
                if (!product) {
                    throw Error(`Error el producto no existe`);
                }
            }
        } catch (err) {
            throw Error(`Error  ${err}`);
        }

    }

    async deleteAllProducts(idC, items){
        let datos = await this.getAll();

        let cart = datos.find (cart => cart.id == idC);
        let productos = cart.products.find(array => array.products == items);

        if(cart && productos) {
            let indexProducts = cart.products.indexOf(productos);
            cart.products.splice(indexProducts.length);

            await this.write(datos, `Se eliminaron todos los productos`);
        } else{
            if (!cart) {
                throw Error(`Error el carrito no existe`);
            }
            if (!productos) {
                throw Error(`Error no hay productos en el carrito`);
            }
        }
    }
}
module.exports = Contenedor;