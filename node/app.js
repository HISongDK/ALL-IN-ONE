const express = require('express')
const app = express()

// const cors = require('cors')
// app.use(cors()) // 解决跨域问题

const logger = require('morgan') // 日志器
app.use(logger('dev')) // app use logger传参调用的函数之后，每次请求路由，控制台会输出相关信息

app.get('/', (req, res) => {
    res.send('Hello Express')
})

app.get('/cross-domain', (req, res) => {
    res.send('是否跨域')
})

app.listen('9000', console.log('服务正在监听 9000 端口'))
