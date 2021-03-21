import axios from 'axios'

// eslint-disable-next-line
const production = 'https://secret-atoll-23654.herokuapp.com/api'

const development = 'http://localhost:5000/api'
export default axios.create({
  baseURL: development,
})
