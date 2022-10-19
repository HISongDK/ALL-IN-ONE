import Service from '../utils/request'

interface IUpdateInfoReq {
  name: string
  email: string
}

const User = {
  update: (data: IUpdateInfoReq) =>
    Service.patch('/api/v1/users/updateMe', data),
}

export default User
