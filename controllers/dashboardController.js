const { Expense, User } = require("../models/index");
const bcrypt = require("bcrypt");

const renderDashboardView = (req, res) => {
  res.render("dashboard/dashboard", { layout: "main", user: req.session.user });
};

const renderTransactionView = (req, res) => {
  res.render("dashboard/transactionsView", {
    layout: "main",
    user: req.session.user,
  });
};

const renderEditProfileView = (req, res) => {
  res.render("dashboard/editProfileView", {
    layout: "main",
    user: req.session.user
  });
};

const renderSpendingByCategoryView = (req, res) => {
  res.render("dashboard/spendingByCategoryView", {
    layout: "main",
    user: req.session.user,
  });
};

const renderSpendingByDateView = (req, res) => {
  res.render("dashboard/spendingByDateView", {
    layout: "main",
    user: req.session.user,
  });
}

const handleLogoutUser = (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.redirect("/auth");
    });
  } else {
    res.status(404).end();
  }
};

const renderAddExpenseView = (req, res) => {
  res.render("dashboard/addExpenseView", {
    layout: "main",
    user: req.session.user,
    message: "",
  });
};

const handleAddExpense = async (req, res) => {
  const { amount, date, payee, category } = req.body;
  try {
    const newExpense = await Expense.create({
      amount,
      date,
      payee,
      category,
      createdBy: req.session.user.id,
    });

    res.render("dashboard/addExpenseView", {
      layout: "main",
      user: req.session.user,
      message: "Added Expense!",
    });
  } catch (error) {
    res.render("dashboard/addExpenseView", {
      layout: "main",
      user: req.session.user,
      message: error.message,
    });
  }
};

const renderEditTransactionView = async (req, res) => {
  try {
    const id = req.params.id;
    const expense = await Expense.findOne({
      where: {
        id: id,
      }
    });
    if (expense) {
      let data = expense.dataValues;
      data.date = new Date(data.date).toISOString().substr(0, 10);;
      res.render("dashboard/editTransactionView", {
        layout: "main",
        user: req.session.user,
        expense: data
      });
    } else {
      res.render("dashboard/addExpenseView", {
        layout: "main",
        user: req.session.user,
        message: "Something went wrong"
      })
    }
  } catch (error) {
    console.log(error);
    res.render("dashboard/addExpenseView", {
      layout: "main",
      user: req.session.user,
      message: error.message
    })
  }
};

const handleDeleteTransaction = async (req, res) => {
  try {
    const id = req.params.id;
    await Expense.destroy({
      where: {
        id: id
      }
    });
    res.redirect("/transactions")
  } catch (error) {
    console.log(error);
  }
};

const handleTransactionEdit = async (req, res) => {
  try {
    const id = req.params.id;
    const { amount, date, payee, category } = req.body;

    const editedTransaction = await Expense.update({
      amount, date, payee, category,
    }, { where: { id } });

    if (editedTransaction) {
      res.redirect("/transactions");
    } else {
      res.render("dashboard/editTransactionView", {
        user: req.session.user,
        layout: "main",
        message: "Unable to edit"
      })
    }
  } catch (error) {
    res.render("dashboard/editTransactionView", {
      user: req.session.user,
      layout: "main",
      message: error.message
    })
  }
};

const handleEditProfile = async (req, res) => {
  const id = req.params.id;
  const { firstName, lastName, email, phone, password } = req.body;
  try {
    const editedUser = await User.update({
      firstName,
      lastName,
      phone,
      email,
      password: bcrypt.hashSync(password, 10),
    }, {
      where: {
        id: id
      }
    });
    if (editedUser) {
      const updatedUser = await User.findOne({
        where: {
          id: id,
        }
      });
      req.session.user = updatedUser;
      req.session.save(() => {
        res.redirect("/profile")
      });
    } else {
      res.render("dashboard/editProfileView", {
        layout: "main",
        user: req.session.user,
        message: "Unable to edit",
      })
    }
  } catch (error) {
    res.render("dashboard/editProfileView", {
      layout: "main",
      user: req.sesion.user,
      message: error.message
    })
  }
};

module.exports = {
  renderDashboardView,
  handleLogoutUser,
  renderAddExpenseView,
  renderEditProfileView,
  handleAddExpense,
  renderTransactionView,
  renderEditTransactionView,
  handleDeleteTransaction,
  handleTransactionEdit,
  handleEditProfile,
  renderSpendingByCategoryView,
  renderSpendingByDateView,
};
