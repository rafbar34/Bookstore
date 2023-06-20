const Product = require('../models/product');
const Cart = require('../models/cart');

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
  const prodId = req.params.productId;

    Product.findById(prodId, (product) => {
      console.log(product);
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products',
      });
    })

};

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true,
    });
  });
};

exports.getcart = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/cart', {
      path: '/cart',
      pageTitle: 'Your cart',
    });
  });
};
exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
Product.findById(prodId,(product)=>{
  Cart.addProduct(prodId, product.price)
})
  res.redirect('/cart');
};
exports.getCheckout = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/cart', {
      path: '/checkout',
      pageTitle: 'checkout',
    });
  });
};
exports.getOrders = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/orders', {
      path: '/orders',
      pageTitle: 'orders',
    });
  });
};
