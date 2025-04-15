const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// 儲存投票結果
let votes = { yes: 0, no: 0 };

app.use(express.json());
app.use(express.static('public'));

// 處理投票請求
app.post('/vote', (req, res) => {
  const { answer } = req.body;
  if (answer === 'yes') votes.yes++;
  else if (answer === 'no') votes.no++;

  res.json({ message: '收到投票！', votes });
});

// 查看統計數據
app.get('/stats', (req, res) => {
  res.json(votes);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
