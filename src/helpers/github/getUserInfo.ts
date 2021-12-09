import axios from 'axios'

export const $getUserInfo = async () => await axios.get('https://api.github.com/users/jaybenaim')
