/* eslint-disable */
import axios from 'axios'

const production = 'https://secret-atoll-23654.herokuapp.com/api'

const development = 'http://localhost:5000/api'

export default axios.create({
  baseURL: development,
})
