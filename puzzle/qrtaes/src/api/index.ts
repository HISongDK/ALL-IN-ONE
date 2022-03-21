import { Service, NeteaseService } from '@/utils/http'

const NormalApi = {
  getExample() {
    return Service.get('')
  },
}

const NeteaseApi = {
  getVideo() {
    return NeteaseService.get('/video/url?id=89ADDE33C0AAE8EC14B99F6750DB954D')
  },
  getLoginStatus() {
    return NeteaseService.get('/login/status')
  },
}

export { NormalApi, NeteaseApi }
