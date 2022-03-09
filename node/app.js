import express from 'express'
import { Server } from 'socket.io'
import cors from 'cors'
import logger from 'morgan' // 日志器
import chalk from 'chalk'
import http from 'http'

const app = express()
const port = 9000

// 初始化 socket.io
const httpServer = http.createServer(app)
const io = new Server(httpServer, {
    cors: true,
})

// express 应用中间件
app.use(logger('dev')) // app use logger传参调用的函数之后，每次请求路由，控制台会输出相关信息
app.use(express.urlencoded({ extended: false })) // 处理 post 请求，获取请求体
app.use(express.json())
app.use(cors()) // 解决跨域问题

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
io.on('connection', (socket) => {
    console.log('User connected')

    socket.on('msg', (msg) => {
        console.log('msg: ' + msg)

        socket.emit('msg', `返回消息：${msg}`)
    })

    socket.on('disconnect', () => {
        console.log('User disconnected')
    })
})

httpServer.listen(
    port,
    console.log(
        `服务正在监听 ${port} 端口\n打开链接: ${chalk.green(
            `http://localhost:${port}`,
        )}`,
    ),
)
