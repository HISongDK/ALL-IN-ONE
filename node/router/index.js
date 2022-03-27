import express from 'express'
import { UserModel } from '../models/index.js'
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
    const { username, password } = req.body

    UserModel.findOne({ username, password }).then((user) => {
        if (!user) {
            return res.json({ code: 401, msg: `无 ${username} 用户信息` })
        }

        res.json({
            code: 200,
            msg: '登陆成功',
            data: user,
        })
    })
})

export default router
