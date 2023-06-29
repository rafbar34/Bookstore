const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll().then(([rows,fieldData])=>{
    res.render('shop/products-list', {
      prods: rows,
      pageTitle: 'Shop',
      path: '/',
      hasProducts: rows.length > 0,
      activeShop: true,
      productCSS: true,
    });

  }).catch(err => console.log(err))
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
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll().then(([rows,fieldData])=>{
    res.render('shop/index', {
      prods: rows,
      pageTitle: 'Shop',
      path: '/',
      hasProducts: rows.length > 0,
      activeShop: true,
      productCSS: true,
    });

  }).catch(err => console.log(err))
};

exports.getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (product of products) {
        const cartProductsData = cart.products.find(
          (prod) => prod.id === product.id
        );
        if (cartProductsData) {
          cartProducts.push({productData: product, qty: cartProductsData.qty});
        }
      }
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your cart',
        products: cartProducts,
      });
    });
  });
};
exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });
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
