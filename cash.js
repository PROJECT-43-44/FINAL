document.addEventListener("DOMContentLoaded", function() {
    const dateInput = document.getElementById("date");

    dateInput.addEventListener("change", () => {
        const date = dateInput.value;
        localStorage.setItem('message', date);
        updateTable();
        updateChart();
    });

    function updateTable() {
        let date = localStorage.getItem('message');
        let connector = "in";
        let new_date = date + ' ' + connector;

        let total_cash_in = localStorage.getItem(new_date);
        let total_cash_out = localStorage.getItem(date);

        // Convert the retrieved values to numbers
        total_cash_in = total_cash_in ? Number(total_cash_in) : 0;
        total_cash_out = total_cash_out ? Number(total_cash_out) : 0;

        const cashInLabel = document.getElementById('cashInLabel');
        const cashOutLabel = document.getElementById('cashOutLabel');
        const balanceLabel = document.getElementById('balanceLabel');

        if (cashInLabel) cashInLabel.innerText = total_cash_in.toString();
        if (cashOutLabel) cashOutLabel.innerText = total_cash_out.toString();
        if (balanceLabel) balanceLabel.innerText = (total_cash_in - total_cash_out).toString();

        console.log(total_cash_in);
        console.log(total_cash_out);
        console.log(total_cash_in - total_cash_out);
    }

    function updateChart() {
        let date = localStorage.getItem('message');
        let connector = "in";
        let new_date = date + ' ' + connector;

        let cashInData = localStorage.getItem(new_date);
        let cashOutData = localStorage.getItem(date);

        // Convert the retrieved values to numbers
        cashInData = cashInData ? Number(cashInData) : 0;
        cashOutData = cashOutData ? Number(cashOutData) : 0;

        // Chart.js code to render a bar chart
        const ctx = document.getElementById('myChart').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Cash In', 'Cash Out'],
                datasets: [{
                    label: 'Amount',
                    data: [cashInData, cashOutData],
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                    ],
                    borderColor: [
                        'rgba(75, 192, 192, 1)',
                        'rgba(255, 99, 132, 1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(tooltipItem) {
                                return '$' + tooltipItem.raw;
                            }
                        }
                    }
                }
            }
        });
    }

    updateTable(); // Initial call to update the table with stored values
    updateChart(); // Initial call to update the chart with stored values

    const cash_out = document.getElementById("button2");
    if (cash_out) {
        cash_out.addEventListener("click", function() {
            window.location.href = 'cash_out.html';
        });
    }

    const staffButton = document.getElementById("button1");
    if (staffButton) {
        staffButton.addEventListener("click", function() {
            window.location.href = "cash_in.html";
        });
    }
});
