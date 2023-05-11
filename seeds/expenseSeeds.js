const { Expense } = require("../models/index");

const expenses = [
    {
        amount: "100",
        payee: "Test 1",
        category: "food",
        date: "03-05-2023",
        createdBy: 1,
    },
    {
        amount: "270",
        payee: "Test 2",
        category: "food",
        createdBy: 1,
        date: "03-05-2023"
    },
    {
        amount: "20",
        payee: "Test 3",
        createdBy: 2,
        category: "paint",
        date: "02-05-2023"
    },
    {
        amount: "400",
        payee: "Test 4",
        category: "electronics",
        createdBy: 2,
        date: "02-05-2023"
    },
]

async function seedExpenses() {
    try {
        await Expense.bulkCreate(expenses);
        console.log("Expenses Seeded!");
        return
    } catch (error) {
        console.log(error.message)
    }
    return
}

module.exports = seedExpenses;