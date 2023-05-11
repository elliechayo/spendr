const { Expense } = require("../../models");

const fetchAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll({
      where: {
        createdBy: req.session.user.id,
      },
    });
    res.json({ success: true, expenses: expenses });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
};

module.exports = {
  fetchAllExpenses,
};
