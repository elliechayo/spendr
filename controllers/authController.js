const { User } = require("../models/index");
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD
  }
});

// handle views
const renderAuthView = (req, res) => {
  res.render("auth/authView", { layout: "auth" });
};

const renderLoginView = (req, res) => {
  let message = "";
  if (req.session.message) {
    message = req.session.message;
    req.session.message = undefined;
  }
  res.render("auth/loginView", { layout: "auth", message: message });
};

const renderRegisterView = (req, res) => {
  res.render("auth/registerView", { layout: "auth" });
};

const renderForgotPasswordView = (req, res) => {
  res.render("auth/forgotPasswordView", { layout: "auth", message: "" });
};

const renderResetPasswordView = (req, res) => {
  res.render("auth/resetPasswordView", { layout: "auth", message: "" })
}

// handle functionalities
const handleRegister = async (req, res) => {
  const { email, firstName, lastName, phone, password } = req.body;
  try {
    await User.create({
      firstName,
      lastName,
      phone,
      password,
      email,
    });
    req.session.save(() => {
      req.session.message = "Registration successful!";
      res.redirect("/auth/login");
    });
  } catch (error) {
    res.render("auth/registerView", { error: error.message, layout: "auth" });
  }
};

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userFromDB = await User.findOne({
      where: {
        email,
      },
    });
    // no user found
    if (!userFromDB) {
      res.render("auth/loginView", {
        layout: "auth",
        error: "Invalid credentials",
      });
      return;
    }
    const validPassword = userFromDB.checkPassword(password);
    // user found but invalid password
    if (!validPassword) {
      res.render("auth/loginView", {
        layout: "auth",
        error: userFromDB.password,
      });
      return;
    }

    req.session.loggedIn = true;
    req.session.user = userFromDB;
    req.session.save(() => {
      res.redirect("/");
    });
  } catch (error) {
    // some error
    res.render("auth/loginView", { layout: "auth", error: error.message });
  }
};

const handleForgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      res.render("auth/forgotPasswordView", { layout: "auth", message: "No  user found!" })
      return
    }
    const passwordResetLink = `${process.env.HOMEPAGE_LINK}/auth/reset-password/${user.id}?key=${process.env.RESET_KEY}`;
    const mailOptions = {
      from: process.env.GMAIL_USER, // sender address
      to: email, // list of receivers
      subject: 'Spendr - Password reset link', // Subject line
      html: `Hello, you have requested for a password reset. Please follow this link to reset your password. ${passwordResetLink}`// plain text body
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if (err)
        res.render("auth/forgotPasswordView", { layout: "auth", message: err.message })
      else
        res.render("auth/forgotPasswordView", { layout: "auth", message: "Password reset link sent to your email" })
    })

  } catch (error) {
    res.render("auth/forgotPasswordView", { layout: "auth", message: error.message })
  }
};

const handleResetPassword = async (req, res) => {
  const { key } = req.query;
  res.render("auth/forgotPasswordView", { layout: "auth", message: key })
}

module.exports = {
  renderAuthView,
  renderLoginView,
  renderRegisterView,
  renderForgotPasswordView,
  handleRegister,
  handleLogin,
  handleForgotPassword,
  renderResetPasswordView,
  handleResetPassword
};
