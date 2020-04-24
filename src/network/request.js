 import axios from "axios"

export function request(config) {
   const instance = axios.create({
     baseURL:'获取接口添加老师的vx：codewhy',
     timeout:5000
   })
  return instance(config)
}


