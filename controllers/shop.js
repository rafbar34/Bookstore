const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((product) => {
      res.render('shop/product-list', {
        prods: product,
        pageTitle: 'All Products',
        path: '/products',
        hasProducts: product.length > 0,
        activeShop: true,
        productCSS: true,
      });
    })
    .catch((err) => console.log(err));
};
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findAll({where: {id: prodId}})
    .then((product) => {
      res.render('shop/product-detail', {
        product: product[0],
        pageTitle: product[0].title,
        path: '/products',
      });
    })
    .catch((err) => console.log(err))
    // Product.findByPk(prodId)
    //   .then((product) => {
    //     res.render('shop/product-detail', {
    //       product: product,
    //       pageTitle: product.title,
    //       path: '/products',
    //     });
    //   })
    .catch((err) => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then((product) => {
      res.render('shop/index', {
        prods: product,
        pageTitle: 'Shop',
        path: '/',
        hasProducts: product.length > 0,
        activeShop: true,
        productCSS: true,
      });
    })
    .catch((err) => console.log(err));
};

exports.getCart = (req, res, next) => {
  req.user.getCart().then((cart) => {
    return cart.getProducts().then(products=>{
      res.render('shop/cart', {
              path: '/cart',
              pageTitle: 'Your cart',
              products: products,
            });
    }).catch(err=>console.log(err));
  });

  // Cart.getCart((cart) => {
  //   Product.fetchAll((products) => {
  //     const cartProducts = [];
  //     for (product of products) {
  //       const cartProductsData = cart.products.find(
  //         (prod) => prod.id === product.id
  //       );
  //       if (cartProductsData) {
  //         cartProducts.push({productData: product, qty: cartProductsData.qty});
  //       }
  //     }
  //     res.render('shop/cart', {
  //       path: '/cart',
  //       pageTitle: 'Your cart',
  //       products: cartProducts,
  //     });
  //   });
  // });
};
exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId, (product) => {
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
