import dayjs from "dayjs";
import { connectDB, createDocument, getDocument, getCollection } from "../../utils/mongoORM.js";
import { generateFakeProduct } from "../fakers/productsFaker.js";

await connectDB();

const seedProducts = async () => {
    const products = await getCollection("PRODUCTS");
    let productAmmount = 50;
    if (products.length === 300 || (products.length + 50) > 300) {

        console.log("No se pueden crear más productos, ya que se ha alcanzado el límite de 300 productos");
        return;
    }

    if(products.length <= 50){
        console.log("INSERTANDO PRIMER PRODUCTO DE PRUEBA");
        const firstProduct = {
            uuid: "0000-0000-0000-0000-0001",
            name: "Producto de prueba",
            sku: "SKU-0001",
            price: 100,
            stock: 10,
            status: true,
            createdAt: dayjs().format("YYYY-MM-DDTHH:mm:ss"),
            updatedAt: dayjs().format("YYYY-MM-DDTHH:mm:ss"),
        }
        const existingProduct = await getDocument("PRODUCTS", { sku: firstProduct.sku });
        if (!existingProduct) {
            await createDocument(firstProduct, "PRODUCTS");
            productAmmount = productAmmount - 1;
        }
    }

    const fakeProducts = [];
    for (let i = 0; i < productAmmount; i++) {
        const product = generateFakeProduct();
        fakeProducts.push(product);
    }

    for (const product of fakeProducts) {
        const existingProduct = await getDocument("PRODUCTS", { sku: product.sku });
        if (!existingProduct) {
            await createDocument(product, "PRODUCTS");
        }
    }
    console.log("Productos creados correctamente");
}

export { seedProducts };