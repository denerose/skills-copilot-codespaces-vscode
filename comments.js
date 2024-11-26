// Create web server
// Create a web server that listens on port 3000 and serves the following static files: index.html, about.html, contact.html, and 404.html. Use the fs module to read the file and send it to the client. If the file doesn't exist, send a 404.html file with a 404 status code.

// Create a web server
const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer((req, res) => {
    const file = req.url === '/' ? 'index.html' : req.url.slice(1);
    const filePath = path.resolve(__dirname, file);
    const ext = path.extname(filePath).slice(1);

    fs.readFile(filePath, (err, data) => {
        if (err) {
            fs.readFile(path.resolve(__dirname, '404.html'), (err, data) => {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end(data);
            });
        } else {
            res.writeHead(200, { 'Content-Type': `text/${ext}` });
            res.end(data);
        }
    });
}).listen(3000, () => console.log('Server is listening on port 3000'));
// In this solution, we create a web server using the http module. We read the requested file using the fs module. If the file doesn't exist, we send the 404.html file with a 404 status code. Otherwise, we send the requested file with a 200 status code. We determine the file extension using the path module and set the Content-Type header accordingly.

// Run the solution and visit http://localhost:3000 to see the files being served. If you visit a file that doesn't exist, you will see the 404.html file.