import express from 'express'
import mongoose from 'mongoose'
import { Server } from 'socket.io'
import cors from 'cors'
import logger from 'morgan' // 日志器
import chalk from 'chalk'
import http from 'http'

import router from './router/index.js'

const db = 'mongodb://localhost/learn_node_db'
const app = express()
const port = 9000

// express 应用中间件
app.use(logger('dev')) // app use logger传参调用的函数之后，每次请求路由，控制台会输出相关信息
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false })) // 处理 post 请求，获取请求体
app.use(express.json())
app.use(cors()) // 解决跨域问题

// 应用路由
app.use(router)

// 初始化 socket.io
const httpServer = http.createServer(app)
const io = new Server(httpServer, {
    cors: true,
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

mongoose
    .connect(db)
    .then(() => {
        console.log(chalk.blue('\n连接数据库成功\n'))

        httpServer.listen(
            port,
            console.log(
                `服务正在监听 ${port} 端口\n打开链接: ${chalk.green(
                    `http://localhost:${port}`,
                )}`,
            ),
        )
    })
    .catch(() => {
        console.log(chalk.red('\n连接数据库失败\n'))
    })
