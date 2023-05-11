const transactionTable = document.querySelector(".transaction-table");

function showTransactions(data) {
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

async function main() {
  try {
    const res = await fetch("/api/expenses");
    const data = await res.json();
    if (data.success === true) {
      showTransactions(data.expenses);
    } else {
      alert(data.error);
    }
  } catch (error) {
    console.error(error);
  }
}

main();