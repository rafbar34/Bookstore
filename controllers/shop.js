const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'Products',
      path: '/products',
      hasProducts: products.length > 0,
    });
  });
};
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId
console.log(prodId)
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    });
  });
};

exports.getCard = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/checkout', {
      path: '/card',
      pageTitle: 'Your Card',
    });
  });
};
exports.getCheckout = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/card', {
      path: '/checkout',
      pageTitle: 'checkout',
    });
  });
}
exports.getOrders = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/orders', {
      path: '/orders',
      pageTitle: 'orders',
    });
  });
}
