import axios from 'axios'
import { HEADER, SESSION } from '../lib/const'
import AsyncStorage from '@react-native-community/async-storage'

const API = axios.create({
  headers: {
    [`${HEADER.CONTENT}`]: HEADER.CONTENT_TYPE
  }
})

API.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem(SESSION.TOKEN)
    if (token) {
      config.headers[`${HEADER.TOKEN}`] = token
    }
    return config
  },
  error => Promise.reject(error)
)

API.interceptors.response.use(function (response) {
  return response
}, function (error) {
  return Promise.reject(error)
})

export default API
