import Service from '../utils/request'

interface ILoginReq {
  username: string
  password: string
  passwordConfirm?: string
}

interface IResponse {
  status: string
  data: any
  token?: string
  message?: string
}

type TRes = Promise<IResponse>

const Auth = {
  login: (data: ILoginReq): TRes => Service.post('/api/v1/users/login', data),
  register: (data: ILoginReq): TRes =>
    Service.post('/api/v1/users/signup', data),
}

export default Auth
