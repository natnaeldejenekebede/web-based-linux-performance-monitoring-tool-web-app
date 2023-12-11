const express = require('express');
const osUtils = require('os-utils');

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/stats', (req, res) => {
  const stats = {
    memory: osUtils.freememPercentage(),
    cpu: osUtils.cpuUsage((v) => {
      res.json({ memory: stats.memory, cpu: v });
    }),
  };
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});