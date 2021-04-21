import axios from 'axios'

export const $filterRepos = async (query: string, limit = 10, page = 1) => await axios.get(`https://api.github.com/search/repositories?q=user:jaybenaim+${query || ''}+in:readme+in:name+in:description&per_page=${limit}&page=${page}`)
