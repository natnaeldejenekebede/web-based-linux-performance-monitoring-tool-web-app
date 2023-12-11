// public/app.js
document.addEventListener('DOMContentLoaded', () => {
  const ctx = document.getElementById('memoryChart').getContext('2d');

  const memoryChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Used Memory', 'Free Memory'],
      datasets: [{
        data: [0, 100],
        backgroundColor: ['#FF6384', '#36A2EB'],
      }],
    },
  });

  const updateMemoryStats = () => {
    fetch('/memory')
      .then(response => response.json())
      .then(data => {
        const usedMemory = data.usedMemory / 1024 / 1024; // Convert to MB for better readability
        const freeMemory = data.freeMemory / 1024 / 1024;

        memoryChart.data.datasets[0].data = [usedMemory, freeMemory];
        memoryChart.update();
      });
  };

  setInterval(updateMemoryStats, 1000);
});
public/app.js