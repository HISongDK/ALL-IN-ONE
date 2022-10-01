const env = process.env.NODE_ENV

const config = {
  development: {
    baseUrl: 'http://localhost:9000',
  },
  production: {
    baseUrl: 'http://localhost:9000',
  },
  test: {
    baseUrl: 'http://localhost:9000',
  },
}

export default config[env]
