const router = require("express").Router();
const { fetchAllExpenses } = require("../../controllers/api/expenseController");

router.get("/", fetchAllExpenses);

module.exports = router;
