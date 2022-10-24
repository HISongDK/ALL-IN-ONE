import Service from '../utils/request'

export default {
  createLog: (data) => Service.post('/api/v1/exercise', data),
}
