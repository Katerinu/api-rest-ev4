import { Router } from "express";
import { createProduct, createToken, productsCheck, getProductBySKU, getPaginatedProducts, updateProduct, deleteProduct} from "../controllers/productsController.js";

const productsRouter = Router();

productsRouter.get("/check", productsCheck);
productsRouter.get("/createToken", createToken);
productsRouter.get("/:sku", getProductBySKU);
productsRouter.get("/", getPaginatedProducts);
productsRouter.post("/createProduct", createProduct);
productsRouter.patch("/:sku", updateProduct);
productsRouter.delete("/:sku", deleteProduct);

export default productsRouter;