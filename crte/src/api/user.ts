import Service from '../utils/request'

interface IUpdateInfoReq {
  name: string
  email: string
}

const User = {
  update: (data: IUpdateInfoReq) =>
    Service.patch('/api/v1/users/updateMe', data),
  deleteMe: () => Service.delete('/api/v1/users/deleteMe'),
}

export default User
