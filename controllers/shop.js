const Product = require('../models/product');
// const Order = require('../models/order');

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
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

  // Product.fetchAll()
  //   .then((product) => {
  //     res.render('shop/product-detail', {
  //       product: product[0],
  //       pageTitle: product[0].title,
  //       path: '/products',
  //     });
  //   })
  //   .catch((err) => console.log(err))
  Product.findByPk(prodId)
    .then((product) => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products',
      });
    })
    .catch((err) => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
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
    return cart
      .getProducts()
      .then((products) => {
        res.render('shop/cart', {
          path: '/cart',
          pageTitle: 'Your cart',
          products: products,
        });
      })
      .catch((err) => console.log(err));
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

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  console.log(prodId, 'prodId');
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts({where: {id: prodId}});
    })
    .then((products) => {
      const product = products[0];
      console.log(product, 'test');
      return product.CartItem.destroy();
    })
    .then((result) => {
      res.redirect('/cart');
    });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId)
    .then((product) => {
      return req.user.addToCart([product]);
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.log(err));
  //   let fetchedCart;
  //   let newQuantity;
  //   req.user
  //     .getCart()
  //     .then((cart) => {
  //       fetchedCart = cart;
  //       return cart.getProducts({where: {id: prodId}});
  //     })
  //     .then((products) => {
  //       let product;
  //       if (products.length > 0) {
  //         product = products[0];
  //       }
  //       newQuantity = 1;
  //       if (product) {
  //         const oldQuantity = product.CartItem.quantity;
  //         newQuantity = oldQuantity + 1;
  //         return product;
  //       }
  //
  //       return Product.findByPk(prodId);
  //     })
  //     .then((product) => {
  //       return fetchedCart.addProduct(product, {
  //         through: {quantity: newQuantity},
  //       });
  //     })
  //     .then(() => {
  //       res.redirect('/cart');
  //     })
  //     .catch((err) => console.log(err));
};
exports.getCheckout = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/cart', {
      path: '/checkout',
      pageTitle: 'checkout',
    });
  });
};

exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then((products) => {
      return req.user
        .createOrder()
        .then((order) => {
          order.addProducts(
            products.map((product) => {
              product.orderItem = {
                quantity: product.CartItem.quantity,
              };
              return product;
            })
          );
        })
        .catch((err) => console.log(err));
    })
    .then((res) => {
      fetchedCart.setProduct(null);
    })
    .then((res) => {
      res.redirect('/orders');
    })
    .catch((err) => console.log(err));
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders({include: ['products']})
    .then((orders) => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'orders',
        orders: orders,
      });
    })
    .catch((err) => console.log(err));
};
