const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

data_path = path.join(__dirname, 'public/data.json');
// 檢查 votes.json 是否存在，如果不存在則創建一個空的 votes.json 文件
if (!fs.existsSync(data_path)) {
  fs.writeFileSync(data_path, JSON.stringify([]));
}

// 處理投票請求
app.post('/musicData', (req, res) => {
  const data = req.body;
  let file_data = JSON.parse(fs.readFileSync(data_path, 'utf8'));
  file_data.push(data);
  fs.writeFileSync(data_path, JSON.stringify(file_data));
});

// 查看統計數據
app.get('/stats', (req, res) => {
  res.json(votes);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
