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
    // 试下后端获取 乐享 token
    // 下面这原来试过下 获取乐享token 不过算是敏感信息 删掉的好
    // 果然是后端没有跨域限制（废话一句）
    // 还有就是axios.post(),不知道怎么不行，还得直接axios()第二个参数里面指定method属性post才可以
})

export default router
