// // public/app.js
// document.addEventListener('DOMContentLoaded', () => {
//   const ctx = document.getElementById('memoryChart').getContext('2d');

//   const memoryChart = new Chart(ctx, {
//     type: 'doughnut',
//     data: {
//       labels: ['Used Memory', 'Free Memory'],
//       datasets: [{
//         data: [0, 100],
//         backgroundColor: ['#FF6384', '#36A2EB'],
//       }],
//     },
//   });

//   const updateMemoryStats = () => {
//     fetch('/memory')
//       .then(response => response.json())
//       .then(data => {
//         const usedMemory = data.usedMemory / 1024 / 1024; // Convert to MB for better readability
//         const freeMemory = data.freeMemory / 1024 / 1024;

//         memoryChart.data.datasets[0].data = [usedMemory, freeMemory];
//         memoryChart.update();
//       });
//   };

//   setInterval(updateMemoryStats, 1000);
// });
// public/app.js
document.addEventListener('DOMContentLoaded', () => {
  const ctx = document.getElementById('cpuChart').getContext('2d');

  const cpuChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Used CPU', 'Free CPU'],
      datasets: [{
        data: [0, 100],
        backgroundColor: ['#FF6384', '#36A2EB'],
      }],
    },
  });

  const updateCpuStats = () => {
    fetch('/cpu')
      .then(response => response.json())
      .then(data => {
        const cpuUsage = data.cpuUsage * 100;

        cpuChart.data.datasets[0].data = [cpuUsage, 100 - cpuUsage];
        cpuChart.update();
      });
  };

  setInterval(updateCpuStats, 1000);
});