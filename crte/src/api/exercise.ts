import Service from '../utils/request'

export default {
  getLogs: (params: any) => Service.get('/api/v1/exercise', { params }),
  createLog: (data: any) => Service.post('/api/v1/exercise', data),
}
