const fs = require('fs');
const http = require('http');
const path = require('path');

// 处理注册请求
const handleRegister = (username, password) => {
    const data = `用户名: ${username}\n密码: ${password}`;
    fs.writeFileSync('vip.txt', data, 'utf8');
    return '注册成功！账号信息已保存到vip.txt';
};

// 创建HTTP服务器
const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/register') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const { username, password } = JSON.parse(body);
            const result = handleRegister(username, password);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: result }));
        });
    } else if (req.method === 'GET' && req.url === '/') {
        // 返回index.html文件
        const filePath = path.join(__dirname, 'index.html');
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

// 启动服务器
server.listen(3000, () => {
    console.log('服务器已启动，访问 http://localhost:3000');
});