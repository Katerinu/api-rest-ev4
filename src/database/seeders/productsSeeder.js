import { connectDB, createDocument, getDocument, getCollection } from "../../utils/mongoORM.js";
import { generateFakeProduct } from "../fakers/productsFaker.js";

await connectDB();

const seedProducts = async () => {
    const products = await getCollection("PRODUCTS");
    let productAmmount = 50;
    if (products.length === 300 || (products.length + 50) > 300) {
        if(!(products.length + 49 === 300)){
            console.log("No se pueden crear más productos, ya que se ha alcanzado el límite de 300 productos");
        return;
        }
        else{
            productAmmount = 49;
        }
    }

    if(products.length <= 50){
        productAmmount = 51;
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