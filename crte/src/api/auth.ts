import Service from '../utils/request'

interface ILoginReq {
  username: string
  password: string
}

const Auth = {
  login: (data: ILoginReq) => Service.post('/api/v1/users/login', data),
}

export default Auth
