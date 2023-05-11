const Handlebars = require("handlebars");

Handlebars.registerHelper("getFullName", function (user) {
  let fName = user.firstName;
  let lName = user.lastName;

  fName = fName[0].toUpperCase() + fName.slice(1).toLowerCase();
  lName = lName[0].toUpperCase() + lName.slice(1).toLowerCase();

  return fName + " " + lName;
});
