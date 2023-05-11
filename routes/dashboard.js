const router = require("express").Router();
const {
  renderDashboardView,
  handleLogoutUser,
  renderAddExpenseView,
  handleAddExpense,
  renderEditTransactionView,
  handleTransactionEdit,
  handleDeleteTransaction,
  renderTransactionView,
  renderEditProfileView,
  renderSpendingByCategoryView,
  renderSpendingByDateView,
  handleEditProfile
} = require("../controllers/dashboardController");

// handle views
router.get("/", renderDashboardView);
router.get("/add-expense", renderAddExpenseView);
router.get("/transactions", renderTransactionView);
router.get("/profile", renderEditProfileView)
router.get("/spending-by-category", renderSpendingByCategoryView);
router.get("/spending-by-date", renderSpendingByDateView);

// handle functions
router.post("/add-expense", handleAddExpense);
router.get("/logout", handleLogoutUser);
router.post("/profile/:id", handleEditProfile);
router.post("/transactions/:id", handleTransactionEdit)
router.get("/transactions/edit/:id", renderEditTransactionView);
router.get("/transactions/delete/:id", handleDeleteTransaction);

module.exports = router;
