import { generateTokenJWT ,verifyTokenJWT} from "../../../utils/tokenGenerator.js";
import { getDocument, createDocument, updateDocument, getCollection} from "../../../utils/mongoORM.js";
import { v4 as uuidv4 } from 'uuid';
import dayjs from "dayjs";

const productsCheck = (req, res) => {
    res.status(200).send("OK");
}

//ENDPOINT UTILIZADO PARA CREAR TOKENS DE ACCESO A LA API PARA LA EVALUACION.
const createToken = (req, res) => {
    const token = generateTokenJWT(searched_user);
    return res.status(200).json({ message: "Token creado correctamente", token });
}

const createProduct = async (req, res) => {
    const { name, sku, price, stock } = req.body;
    if(!name || !sku || !price || !stock) {
        return res.status(400).json({ message: "Faltan datos para crear el producto" });
    }

    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: "No se ha proporcionado un token" });
    }
    const decoded = verifyTokenJWT(token);
    if (!decoded) {
        return res.status(401).json({ message: "Token inválido" });
    }

    const searched_product = await getDocument("PRODUCTS", { sku });

    if (searched_product) {
        return res.status(400).json({ message: "El producto ya existe" });
    }

    if( name.length > 50) {
        return res.status(400).json({ message: "El nombre del producto no puede tener más de 50 caracteres" });
    }
    if( sku.length > 30) {
        return res.status(400).json({ message: "El SKU del producto no puede tener más de 20 caracteres" });
    }
    if( price <= 0) {
        return res.status(400).json({ message: "El precio del producto no puede ser menor a 0" });
    }
    if( stock < 0) {
        return res.status(400).json({ message: "El stock del producto no puede ser menor a 0" });
    }

    const newProduct = {
        uuid: uuidv4(),
        name,
        sku,
        price,
        stock,
        status: true,
        createdAt: dayjs().format("YYYY-MM-DDTHH:mm:ss"),
        updatedAt: dayjs().format("YYYY-MM-DDTHH:mm:ss"),
    };

    const createdProduct = await createDocument("PRODUCTS", newProduct);
    if (!createdProduct) {
        return res.status(500).json({ message: "Error al crear el producto" });
    }
    return res.status(201).json({ message: "Producto creado correctamente", product: createdProduct });

}

const getProductBySKU = async (req, res) => {
    const { sku } = req.params;
    if (!sku) {
        return res.status(400).json({ message: "Faltan datos para buscar el producto" });
    }

    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: "No se ha proporcionado un token" });
    }
    const decoded = verifyTokenJWT(token);
    if (!decoded) {
        return res.status(401).json({ message: "Token inválido" });
    }

    const searched_product = await getDocument("PRODUCTS", { sku: sku });
    if (!searched_product) {
        return res.status(404).json({ message: "Producto no encontrado" });
    }
    if( searched_product.status === false) {
        return res.status(400).json({ message: "El producto no está disponible" });
    }

    const productResponse = {
        name: searched_product.name,
        sku: searched_product.sku,
        price: searched_product.price,
        stock: searched_product.stock
    };

    return res.status(200).json({ message: "Producto encontrado", product: productResponse });
}

const getPaginatedProducts = async (req, res) => {
    const { page, limit } = req.query;
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: "No se ha proporcionado un token" });
    }
    const decoded = verifyTokenJWT(token);
    if (!decoded) {
        return res.status(401).json({ message: "Token inválido" });
    }

    const products = await getCollection("PRODUCTS");

    if (!products) {
        return res.status(500).json({ message: "Error al obtener los productos" });
    }

    const filteredProducts = products.filter(product => product.status === true);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex).map(product => ({
        name: product.name,
        sku: product.sku,
        price: product.price,
        stock: product.stock
    }));

    if (paginatedProducts.length === 0) {
        return res.status(404).json({ message: "No se encontraron productos" });
    }
    return res.status(200).json({ message: "Productos encontrados", products: paginatedProducts });
}

const updateProduct = async (req, res) => {
    const { sku } = req.params;
    if (!sku) {
        return res.status(400).json({ message: "Faltan datos para buscar el producto" });
    }

    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: "No se ha proporcionado un token" });
    }
    const decoded = verifyTokenJWT(token);
    if (!decoded) {
        return res.status(401).json({ message: "Token inválido" });
    }

    const searched_product = await getDocument("PRODUCTS", { sku: sku });
    
    if (!searched_product) {
        return res.status(404).json({ message: "Producto no encontrado" });
    }
    if( searched_product.status === false) {
        return res.status(400).json({ message: "El producto no está disponible" });
    }

    let name = searched_product.name;
    let price = searched_product.price;
    let stock = searched_product.stock;

    if (new_name) {
        if (new_name.length > 50) {
            return res.status(400).json({ message: "El nombre del producto no puede tener más de 50 caracteres" });
        }
        name = new_name;
    }
    if(new_price) {
        if (new_price <= 0) {
            return res.status(400).json({ message: "El precio del producto no puede ser menor a 0" });
        }
        price = new_price;
    }
    if(new_stock) {
        if (new_stock < 0) {
            return res.status(400).json({ message: "El stock del producto no puede ser menor a 0" });
        }
        stock = new_stock;
    }

    const date = dayjs().format("YYYY-MM-DDTHH:mm:ss");
    const updatedProduct = await updateDocument("PRODUCTS", { sku: sku }, { name: name, price: price, stock: stock, updatedAt: date });
    if (!updatedProduct) {
        return res.status(500).json({ message: "Error al actualizar el producto" });
    }
    return res.status(204).json({ message: "Producto actualizado correctamente", product: updatedProduct });
}

const deleteProduct = async (req, res) => {
    const { sku } = req.params;
    if (!sku) {
        return res.status(400).json({ message: "Faltan datos para buscar el producto" });
    }
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: "No se ha proporcionado un token" });
    }
    const decoded = verifyTokenJWT(token);
    if (!decoded) {
        return res.status(401).json({ message: "Token inválido" });
    }
    const searched_product = await getDocument("PRODUCTS", { sku: sku });
    if (!searched_product) {
        return res.status(404).json({ message: "Producto no encontrado" });
    }
    if( searched_product.status === false) {
        return res.status(400).json({ message: "El producto no está disponible" });
    }
    const date = dayjs().format("YYYY-MM-DDTHH:mm:ss");
    const deletedProduct = await updateDocument("PRODUCTS", { sku: sku }, { status: false, updatedAt: date });
    if (!deletedProduct) {
        return res.status(500).json({ message: "Error al eliminar el producto" });
    }
    return res.status(204).json({ message: "Producto eliminado correctamente", product: deletedProduct });
}

export { productsCheck, createToken, createProduct, getProductBySKU, getPaginatedProducts, updateProduct, deleteProduct };