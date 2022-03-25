import http from 'http'
import chalk from 'chalk'

http.createServer(async function (req, res) {
    let data = ''
    await req.on('data', (chunk) => {
        data += chunk
    })
    await req.on('end', () => {})

    if (data) {
        res.write(data)
    } else {
        res.write('Hello,Node.js!')
    }
    res.end()
}).listen(65535)

console.log(
    '\nServer started. Listening on port 65535\n' +
        chalk.green.underline('点击访问: http://localhost:65535'),
)
