const http = require('http')

http.createServer(function (req, res) {
    res.write('Hello,Node.js!')
    res.end()
}).listen(9527)

console.log('Server started. Listening on port 9527')
