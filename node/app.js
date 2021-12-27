const express = require('express')
const app = express()

const logger = require('morgan') // 日志器
app.use(logger('dev')) // app use logger传参调用的函数之后，每次请求路由，控制台会输出相关信息

// 处理 post 请求，获取请求体
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// const cors = require('cors')
// app.use(cors()) // 解决跨域问题

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

app.listen('9000', console.log('服务正在监听 9000 端口'))
