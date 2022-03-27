import mongoose from 'mongoose'
const { Schema, model } = mongoose

const adminAccount = { username: 'admin', password: 'admin' }

// 描述结构
const UserSchema = new Schema({
    username: { type: String, require: true },
    password: { type: String, require: true },
})

// 生成对应集合
const UserModel = model('users', UserSchema)

// 生成默认用户
UserModel.findOne(adminAccount).then((admin) => {
    UserModel.deleteOne({ username: 'admin' })
    if (!admin) {
        UserModel.create(adminAccount).then((res) => {
            console.log('===  res  ===\n', res)
        })
    }
})

export { UserModel }
