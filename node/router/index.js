import express from 'express'
const router = express.Router() // 得到路由器对象
/**
 * 接口路由
 */
router.get('/hello', (req, res) => {
    res.send('Hello Express')
})

router.get('/cross-domain', (req, res) => {
    res.send('是否跨域')
})

router.post('/login', (req, res) => {
    const { body } = req
    console.log(body)
    res.json({
        code: 200,
        msg: '请求成功',
        token: '12345678',
    })
})

export default router
