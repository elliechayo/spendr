const { User } = require("../models/index");
const bcrypt = require("bcrypt");

const users = [
    {
        firstName: "John",
        lastName: "Doe",
        email: "john@spendr.com",
        password: bcrypt.hashSync("securepassword", 10),
        phone: "12345 54321"
    },
    {
        firstName: "Jane",
        lastName: "Doe",
        email: "jane@spendr.com",
        password: bcrypt.hashSync("securepassword", 10),
        phone: "12345 54321"
    },

];

async function seedUsers() {
    try {
        await User.bulkCreate(users);
        console.log("User seeded")
        return;
    } catch (error) {
        console.log(error.message);
    }
    return
}

module.exports = seedUsers