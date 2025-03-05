const express = require('express');
const router = express.Router();
const productListController = require('../controllers/ProductsListController');

router.get('/products', productListController.getAll);
router.get('/products/:id', productListController.takeOne);

module.exports = router;
