import axios from 'axios'

const Service = axios.create({
  timeout: 3000,
})

export default Service
