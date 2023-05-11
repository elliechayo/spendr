const transactionTable = document.querySelector(".transaction-table");
const categoryExpenseChart = document.getElementById("categoryExpenseChart");
const totalExpenses = document.getElementById("totalExpenses");
const selectCategory = document.getElementById("selectCategory");
let transactions = [];

function filterTransactions(event) {
    const val = event.target.value;
    if (!val) {
        showTransactions(transactions);
        return;
    };
    let filtered = transactions.filter(e => e.category.toLowerCase() === val.toLowerCase());
    showTransactions(filtered);
}

selectCategory.addEventListener("change", filterTransactions);

function createCategoryExpenseChart(data) {
    const obj = {};
    data.forEach((e) => {
        if (obj[e.category.toLowerCase()] !== undefined) {
            obj[e.category.toLowerCase()] += e.amount;
        } else {
            obj[e.category.toLowerCase()] = e.amount;
        }
    });
    new Chart(categoryExpenseChart, {
        type: "pie",
        data: {
            labels: Object.keys(obj),
            datasets: [{ label: "Amount", data: Object.values(obj) }],
        },
        options: {
            maintainAspectRatio: true,
            responsive: true,
            plugins: {
                legend: {
                    position: "right",
                },
            },
        },
    });
}

function showTransactions(data) {
    transactionTable.innerHTML = ""
    data.forEach((e) => {
        let li = document.createElement("li");
        li.id = e.id;
        li.innerHTML = `
        <p>${new Date(e.date).toLocaleDateString()}</p>
        <p>${e.payee}</p>
        <p>${e.category}</p>
        <p>$${e.amount}</p>
        <div>
          <a href="/transactions/edit/${e.id}"><i class="fa-sharp fa-solid fa-pen"></i></a>
          <a href="/transactions/delete/${e.id}"><i class="fa-solid fa-trash-can"></i></a>
        </div>
        `;
        transactionTable.append(li);
    });
}

function updateTotalExpenses(data) {
    let t = data.reduce((a, b) => a += Number(b.amount), 0);
    totalExpenses.innerText = `$${t}`
}

function addCategoryToFilter(data) {
    selectCategory.innerHTML = `<option value="">None</option>`;
    let c = [];
    data.forEach(e => {
        e = e.category.toLowerCase();
        if (c.indexOf(e) === -1 && e) {
            c.push(e);
        }
    });
    c.forEach(e => {
        let o = `<option value="${e}">${e}</option>`;
        selectCategory.innerHTML += o;
    })
}

async function main() {
    try {
        const res = await fetch("/api/expenses");
        const data = await res.json();
        if (data.success === true) {
            transactions = data.expenses;
            addCategoryToFilter(transactions);
            showTransactions(transactions);
            createCategoryExpenseChart(transactions);
            updateTotalExpenses(transactions);
        } else {
            alert(data.error);
        }
    } catch (error) {
        console.error(error);
    }
}

main();