const path = require('path');

const express = require('express');

const adminControler = require('../controllers/admin');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', adminControler.getAddProduct);
router.get('/products', adminControler.getProducts);

// /admin/add-product => POST
router.post('/add-product', adminControler.postAddProduct);

router.get('/edit-product/:productId', adminControler.getEditProduct)
module.exports = router;
