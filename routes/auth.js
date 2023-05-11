const router = require("express").Router();

const {
  renderAuthView,
  renderLoginView,
  renderRegisterView,
  renderForgotPasswordView,
  handleRegister,
  handleLogin,
  handleForgotPassword,
  renderResetPasswordView,
  handleResetPassword
} = require("../controllers/authController");
const unauthorized = require("../middlewares/unauthorized");

// handle views
router.get("/login", renderLoginView);
router.get("/register", renderRegisterView);
router.get("/forgot-password", renderForgotPasswordView);
router.get("/", unauthorized, renderAuthView);
router.get("/reset-password/:id", renderResetPasswordView);

// handle functionalities
router.post("/register", handleRegister);
router.post("/login", handleLogin);
router.post("/forgot-password", handleForgotPassword)
router.post("/reset-password/:id", handleResetPassword);

module.exports = router;
