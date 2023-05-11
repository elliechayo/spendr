const transactionTable = document.querySelector(".transaction-table");
const categoryExpenseChart = document.getElementById("categoryExpenseChart");
const totalExpenses = document.getElementById("totalExpenses");
const selectDate = document.getElementById("selectDate");
let transactions = [];

function filterTransactions(event) {
    showTransactions(transactions.reverse());
}

selectDate.addEventListener("change", filterTransactions);

function createExpenseChart(data) {
    const year = [];
    const amount = [];
    data.forEach((e) => {
        year.push(new Date(e.date).toLocaleDateString());
        amount.push(e.amount);
    });
    new Chart(totalExpenseChart, {
        type: "bar",
        data: {
            labels: year,
            datasets: [
                {
                    label: "Amount",
                    data: amount,
                    borderWidth: 1,
                },
            ],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
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

async function main() {
    try {
        const res = await fetch("/api/expenses");
        const data = await res.json();
        if (data.success === true) {
            transactions = data.expenses;
            showTransactions(transactions);
            createExpenseChart(transactions);
            updateTotalExpenses(transactions);
        } else {
            alert(data.error);
        }
    } catch (error) {
        console.error(error);
    }
}

main();