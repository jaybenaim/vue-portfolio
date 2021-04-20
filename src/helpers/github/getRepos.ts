import axios from 'axios'

export const $getRepos = async (startAt = 0, limit = 30, page = 1, sortBy = 'created',) => await axios.get(`https://api.github.com/users/jaybenaim/repos?start_at=${startAt}&sort=${sortBy}&per_page=${limit}&page=${page}`)
