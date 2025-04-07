// import express from "express";
// import * as productController from "../controllers/productController.js";

// const router = express.Router();

// router.get("/", productController.getAllProducts);
// router.get("/:id", productController.getProductById);
// router.post("/", productController.createProduct);
// router.put("/:id", productController.updateProduct);
// router.delete("/:id", productController.deleteProduct);

// export default router;
import express from "express";
import * as productController from "../controllers/productController.js";

const router = express.Router();

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.post("/", productController.createProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

// ✅ Correct place for this route
router.get("/category/:category", productController.getProductsByCategory);

export default router;
