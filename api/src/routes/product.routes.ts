import { Router } from "express";
import {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/product.controller";

/**
 * The products routes for client side are: get_one and get_all. This routes will return
 * documents from the MongoDB database. The admin side routes are: post, delete and put.
 */
const router = Router();

router.post("/products", createProduct);
router.get("/products", getProducts);
router.get("/products/:id", getProduct);
router.delete("/products/:id", deleteProduct);
router.put("/products/:id", updateProduct);

export default router;
