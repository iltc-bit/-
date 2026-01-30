
const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
  // 取得請求路徑並移除查詢參數
  let url = req.url.split('?')[0];
  // 預設首頁為 index.html
  let filePath = path.join(__dirname, url === '/' ? 'index.html' : url);

  // 定義常見的 MIME 類型
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.tsx': 'text/javascript' // 將 .tsx 視為 JS，交由環境的編譯器處理
  };

  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // 如果找不到檔案，回傳 index.html（支援單頁應用 SPA 路由）
        fs.readFile(path.join(__dirname, 'index.html'), (err2, data2) => {
          if (err2) {
            res.writeHead(404);
            res.end('Not Found');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data2);
          }
        });
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
});

// 監聽 0.0.0.0 與指定的 PORT 這是 Cloud Run 運作的必要條件
server.listen(port, '0.0.0.0', () => {
  console.log(`Server is running and listening on port ${port}`);
});
