let salesChart, reservationsChart;

document.addEventListener('DOMContentLoaded', () => {
    initCharts();
    document.getElementById('timeRange').addEventListener('change', updateCharts);
});

function initCharts() {
    const ctx1 = document.getElementById('salesChart').getContext('2d');
    const ctx2 = document.getElementById('reservationsChart').getContext('2d');
    
    salesChart = new Chart(ctx1, {
        type: 'bar',
        data: getChartData('sales')
    });
    
    reservationsChart = new Chart(ctx2, {
        type: 'line',
        data: getChartData('reservations')
    });
}

function getChartData(type) {
    const range = document.getElementById('timeRange').value;
    // Lógica para obtener datos según el rango
    return {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
        datasets: [{
            label: type === 'sales' ? 'Ventas' : 'Reservas',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: type === 'sales' ? '#6d4c41' : '#ffab91'
        }]
    };
}

function updateCharts() {
    salesChart.data = getChartData('sales');
    reservationsChart.data = getChartData('reservations');
    salesChart.update();
    reservationsChart.update();
}
