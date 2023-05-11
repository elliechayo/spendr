const totalExpenseChart = document.getElementById("totalExpenseChart");
const categoryExpenseChart = document.getElementById("categoryExpenseChart");
const activityUL = document.getElementById("activityUL");

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
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        legend: {
          position: "right",
        },
      },
    },
  });
}

function createActivity(data) {
  data.forEach((e) => {
    let li = `<li>
    <div>
      <h3>${e.payee}</h3>
      <p>${e.category}</p>
    </div>
    <div>
      <h3>$${e.amount}</h3>
      <p>${new Date(e.date).toLocaleDateString()}</p>
    </div>
  </li>`;
    activityUL.innerHTML += li;
  });
}

async function main() {
  try {
    const res = await fetch("/api/expenses");
    const data = await res.json();
    if (data.success === false) {
      alert(data.error);
      return;
    }
    createExpenseChart(data.expenses);
    createCategoryExpenseChart(data.expenses);
    createActivity(data.expenses);
  } catch (error) {
    console.error(error);
  }
}
main();
