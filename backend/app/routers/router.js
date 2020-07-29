const verifySignUp = require("./verifySignUp");
const authJwt = require("./verifyJwtToken");
const authController = require("../controllers/authController.js");
const userController = require("../controllers/userController.js");
const bookController  = require("../controllers/bookController.js");
const orderController = require("../controllers/orderController.js");
const commentController = require("../controllers/commentController.js");

module.exports = function(app) {
  // Auth
  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUserNameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    authController.signup
  );
  app.post("/api/auth/signin", authController.signin);

  // get all user
  app.get("/api/users", [authJwt.verifyToken], userController.users);
  app.put("/api/users/:id", [authJwt.verifyToken], userController.putUserRole );
  app.get("/api/getuser/", [authJwt.verifyToken], userController.userId )
  app.put("/api/profile/edit", [authJwt.verifyToken], userController.editProfile)

  // get 1 user according to roles
  app.get("/api/test/user", [authJwt.verifyToken], userController.userContent);
  app.get(
    "/api/test/pm",
    [authJwt.verifyToken, authJwt.isPmOrAdmin],
    userController.managementBoard
  );
  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    userController.adminBoard
  );
  //comment
  app.post("/api/comment/:id", [authJwt.verifyToken, authJwt.isUser], commentController.addComment)

  //books
  app.post("/api/books", [authJwt.verifyToken], bookController.addBook);
  app.get("/api/books",  [authJwt.verifyToken], bookController.viewBook);
  app.get("/api/detail/:id", bookController.detailBook);
  app.get("/api/books/:id", [authJwt.verifyToken], bookController.viewIdBook);
  app.put("/api/books/:id", [authJwt.verifyToken], bookController.updateBook);
  app.delete("/api/books/:id", [authJwt.verifyToken], bookController.deleteBook);

  //orders
  app.post("/api/orders", [authJwt.verifyToken], orderController.addOrder);
  app.get("/api/orders", [authJwt.verifyToken], orderController.viewOrder);
  app.get("/api/orders/users/:id",  [authJwt.verifyToken], orderController.viewIdUser);

  // error handler 404
  app.use(function(req, res, next) {
    return res.status(404).send({
      status: 404,
      message: "Not Found"
    });
  });

  // error handler 500
  app.use(function(err, req, res, next) {
    return res.status(500).send({
      error: err
    });
  });
};
