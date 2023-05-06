const Product = require("../models/product");

// const products = [];
exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "Shop",
        path: "/products",
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true,
      });
    })
    .catch((err) => console.log(err));

  //This searches in the operating system main directory instead here inside the file structure. To overcome this we need to import path module and use join() method
  // res.sendFile("/views/shop.html");
  ////
  //This variable holds the absolute path for the operating system for this whole project. Here we are passing "../" because the __dirmname points into rotes folder. To reach the views/shop.html we have to go one step out
  // res.sendFile(path.join(rootDir, "views", "shop.html"));
  ////
  //Without the above "rootDir", we should have written the code like below
  // res.sendFile(path.join(__dirname, "../", "views", "shop.html"));
};
exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      //This renders the shop.pug in views folder, we have set the pug engine and views location in the app.js
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      }); //passing the products array with prods key to the shop.pug}).catch(err=>console.log(err));
    })
    .catch((err) => console.log(err));
};

exports.getProduct = (req, res, err) => {
  //Here, in the params we are accessing the dynamic segment passed
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      res.render("shop/product-detail", {
        product: product,
        pageTitle: "cart",
        path: "/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCart = (req, res, err) => {
  req.user
    .getCart()
    .then((products) => {
      res.render("shop/cart", {
        pageTitle: "Your Cart",
        path: "/cart",
        products: products,
      });
    })
    .catch((err) => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => res.redirect("/cart"))
    .catch((err) => console.log(err));
  /* let fetchedCart;
  let newQuantity = 1;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }

      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(prodId);
    })
    .then((product) => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity },
      });
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => {
      console.log(err);
    });*/

  /** */
  // Product.findById(prodId, (product) => {
  //   Cart.addProduct(prodId, product.price);
  // });
  // res.redirect("/cart");
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;

  req.user
    .deleteItemFromCart(prodId)
    .then((result) => res.redirect("/cart"))
    .catch((err) => console.log(err));
  // req.user
  //   .getCart()
  //   .then((cart) => {
  //     return cart.getProducts({ where: { id: prodId } });
  //   })
  //   .then((products) => {
  //     const product = products[0];
  //     return product.cartItem.destroy();
  //   })
  //   .then((result) => {
  //     res.redirect("/cart");
  //   })
  //   .catch((err) => console.log(err));
};

exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.user
    .addOrder()
    .then((result) => {
      res.redirect("./orders");
    })
    .catch((err) => console.log(err));
};

exports.getOrders = (req, res, err) => {
  req.user
    .getOrders()
    .then((orders) => {
      res.render("shop/orders", {
        pageTitle: "Your Orders",
        path: "/orders",
        orders: orders,
      });
    })
    .catch((err) => console.log(err));
};

exports.getCheckout = (req, res, err) => {
  res.render("shop/checkout", {
    pageTitle: "checkout page",
    path: "/checkout",
  });
};

exports.showAdminProducts = (req, res, error) => {
  res.render("admin/products-list", {
    pageTitle: "Admin Product Pages",
    path: "/admin/products",
  });
};
