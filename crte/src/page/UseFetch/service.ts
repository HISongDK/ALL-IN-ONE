import request from './fetch'

export default {
  async getUserInfo() {
    const res = await request('https://api.github.com/users/ruanyf')
    return res
  },
}
