import express from 'express'
import logger from 'morgan' // 日志器
import chalk from 'chalk'
import { Server } from 'socket.io'
import http from 'http'
import path from 'path'
// import cors from 'cors'

const __dirname = path.resolve()

// 初始化 express 应用
const app = express()
app.use(logger('dev')) // app use logger传参调用的函数之后，每次请求路由，控制台会输出相关信息
app.use(express.urlencoded({ extended: false })) // 处理 post 请求，获取请求体
app.use(express.json())
// app.use(cors()) // 解决跨域问题

// 初始化 socket.io
const httpServer = http.createServer(app)
const io = new Server(httpServer)

/**
 * 接口路由
 */
app.get('/', (req, res) => {
    res.send('Hello Express')
})

app.get('/cross-domain', (req, res) => {
    res.send('是否跨域')
})

app.post('/login', (req, res) => {
    const { body } = req
    console.log(body)
    res.json({
        code: 200,
        msg: '请求成功',
        token: '12345678',
    })
})

/**
 * Socket.IO 示例
 */
app.get('/socket.io', (req, res) => {
    res.sendFile(__dirname + '/socket/index.html')
})

io.on('connect', (socket) => {
    console.log('---  socket  ---\n', socket)
})

app.listen(
    '9000',
    console.log(
        `服务正在监听 9000 端口\n打开链接: ${chalk.green(
            'http://localhost:9000',
        )}`,
    ),
)

export {}
