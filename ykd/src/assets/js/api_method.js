import Axios from 'axios'
import {commonUrl} from '@/assets/js/common.js'
const instance = Axios.create({
  baseURL: commonUrl
})
export function messagelist (params = {}) {
  return instance.post('/medstore/appReq', params)
}
