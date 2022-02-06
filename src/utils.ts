import axios from 'axios'

export const usersApi = axios.create({
  baseURL: 'https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb',
})
