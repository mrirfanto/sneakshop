import express from "express";
const router = express.Router();
import {
  getProductById,
  getProducts,
  deleteProductById,
} from "../controllers/productController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

router.route("/").get(getProducts);
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProductById);

export default router;
