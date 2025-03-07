const express = require("express");
const router = express.Router();
const productListController = require("../controllers/ProductsListController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/products", productListController.getAll);
router.get("/products/:id", productListController.takeOne);

module.exports = router;
