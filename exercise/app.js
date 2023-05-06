const express = require("express");

const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/error");
const mongoConnect = require("./util/database").mongoConnect;
const User = require("./models/user");
/**EJS TEMPLATE*/
app.set("view engine", "ejs");
app.set("views", "views");
//**END EJS */

//This parses the body before it passes it to other middleware
app.use(bodyParser.urlencoded({ extended: false }));

//Here we are staticlly providing the file in the below path(giving read access to the below file path), In this case we are giving access to public folder which has styling files
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("6452dc6a4bdb11a4a0d8df8d")
    .then((user) => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch((err) => console.log(err));
});

//Here, the '/admin' we are passing will be used as start segment url for the middlewares in adminRoutes.(eg., if there is an url '/add-produts' in the adminRoutes's middleware. Then that middleware will be reached at '/admin/add-products' because we are passing the starting segment here. Passing that url segment is optional)
app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);
mongoConnect(() => {
  app.listen(3000);
});
