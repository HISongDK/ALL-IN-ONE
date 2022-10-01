import Service from './http'

interface ILoginReq {
  username: string
  password: string
}

const Request = {
  async login(data: ILoginReq): Promise<any> {
    const res = await Service.post('/api/login', data)
    return res.data
  },
}

export default Request
