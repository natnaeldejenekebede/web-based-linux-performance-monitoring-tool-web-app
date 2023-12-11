const express = require('express');
const os = require('os');

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/memory', (req, res) => {
  const totalMemory = os.totalmem();
  const freeMemory = os.freemem();
  const usedMemory = totalMemory - freeMemory;
  const memoryUsagePercentage = (usedMemory / totalMemory) * 100;

  res.json({ totalMemory, usedMemory, freeMemory, memoryUsagePercentage });
});

app.use(express.static('public'));

app.get('/cpu', (req, res) => {
  osUtils.cpuUsage((cpuUsage) => {
    res.json({ cpuUsage });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });