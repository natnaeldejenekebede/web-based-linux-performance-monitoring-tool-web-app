document.addEventListener('DOMContentLoaded', () => {
    const memoryChart = new Chart(document.getElementById('memoryChart').getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: ['Used Memory', 'Free Memory'],
        datasets: [{
          data: [0, 100],
          backgroundColor: ['#FF6384', '#36A2EB'],
        }],
      },
    });
  
    const cpuChart = new Chart(document.getElementById('cpuChart').getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: ['Used CPU', 'Free CPU'],
        datasets: [{
          data: [0, 100],
          backgroundColor: ['#FF6384', '#36A2EB'],
        }],
      },
    });
  
    const updateStats = () => {
      fetch('/stats')
        .then(response => response.json())
        .then(data => {
          memoryChart.data.datasets[0].data = [data.memory, 100 - data.memory];
          cpuChart.data.datasets[0].data = [data.cpu * 100, 100 - (data.cpu * 100)];
  
          memoryChart.update();
          cpuChart.update();
        });
    };
  
    setInterval(updateStats, 1000);
  });