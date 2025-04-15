const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

data_path = path.join(__dirname, 'votes.json');
// 檢查 votes.json 是否存在，如果不存在則創建一個空的 votes.json 文件
if (!fs.existsSync(data_path)) {
  fs.writeFileSync(data_path, JSON.stringify({ yes: 0, no: 0 }));
}

// 處理投票請求
app.post('/vote', (req, res) => {
  const { answer } = req.body;
  let votes = JSON.parse(fs.readFileSync(data_path, 'utf8'));
  if (answer === 'yes') votes.yes++;
  else if (answer === 'no') votes.no++;
  fs.writeFileSync(data_path, JSON.stringify(votes));
  // 更新 votes.json 文件

  res.json({ message: '收到投票！', votes });
});

// 查看統計數據
app.get('/stats', (req, res) => {
  res.json(votes);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
