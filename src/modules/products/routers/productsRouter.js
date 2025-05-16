import { Router } from "express";
import { productsCheck } from "../controllers/productsController";

const productsRouter = Router();

productsRouter.get("/check", productsCheck);

export default productsRouter;