import axios from 'axios'

export const $filterRepos = async (query: string) => await axios.get(`https://api.github.com/search/repositories?q=user:jaybenaim+${query}`)
