 import axios from "axios"

export function request(config) {
   const instance = axios.create({
     baseURL:'http://106.54.54.237:8000/api/h8',
     // baseURL:'http://123.207.32.32:8000/api/h8',
     // baseURL:'http://152.136.185.210:8000/api/h8',
     timeout:5000
   })
  return instance(config)
}


