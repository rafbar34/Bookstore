const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');
class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }
  save() {
    const db = getDb();
    return db
      .collection('users')
      .insertOne({username: this.name, email: this.email});
  }
  addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex((cp) => {
      return String(cp.productId) == String(product._id);
    });
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];
    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        productId: new mongodb.ObjectId(product._id),
        quantity: newQuantity,
      });
    }

    const updatedCart = {
      items: updatedCartItems,
    };
    const db = getDb();
    return db
      .collection('users')
      .updateOne(
        {_id: new mongodb.ObjectId(this._id)},
        {$set: {cart: updatedCart}}
      );
  }
  getCart() {
    const db = getDb();
    const productIds = this.cart.items.map((i) => {
      return i.productId;
    });
    return db
      .collection('products')
      .find({_id: {$in: productIds}})
      .toArray()
      .then((products) => {
        return products.map((p) => {
          return {
            ...p,
            quantity: this.cart.items.find((i) => {
              return String(i.productId) === String(p._id);
            }).quantity,
          };
        });
      })
      .catch((err) => console.log(err));
  }
  static findByPk(userId) {
    const db = getDb();

    return db.collection('users').findOne({_id: new mongodb.ObjectId(userId)});
  }
}

module.exports = User;
