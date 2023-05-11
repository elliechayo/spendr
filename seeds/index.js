const seedExpenses = require("./expenseSeeds");
const seedUsers = require("./userSeeds");

async function main() {
    await seedExpenses();
    await seedUsers();
    process.exit(0);
}

main();