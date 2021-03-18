import axios from 'axios'

export default axios.create({
  baseURL: 'https://secret-atoll-23654.herokuapp.com/api',
})
