const http=require('http');
const path=require('path');
const fs=require('fs');
const hostname='localhost';
const port=3000;
const server=http.createServer((req,res)=> {
    console.log(req.headers);
    res.statusCode=200;
    res.setHeader('Content-Type','text/html');
    res.end('<html><body><h1>helloooooooo</h1></body></html>');
});

server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);  //use tild symbol `  when we want to access variables
    });

