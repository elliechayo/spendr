const router = require("express").Router();
const authorize = require("../middlewares/authorize");
const unauthorized = require("../middlewares/unauthorized");

router.use("/auth", unauthorized, require("./auth"));
router.use("/", authorize, require("./dashboard"));
router.use("/api/expenses", authorize, require("./api/expenses"));

module.exports = router;
