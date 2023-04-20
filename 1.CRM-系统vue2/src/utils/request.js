//1.引入axios
import axios from "axios"
import { Message } from "element-ui"
//2.配置
const instance = axios.create({
  baseURL: "http://127.0.0.1:5000",
});
//3.请求拦截器
// 3-1添加请求拦截器
// axios的请求拦截器
instance.interceptors.request.use((config) => {
  // 所有请求 在发送出去之前 都会被拦截  作用:  统一携带参数
  let token = localStorage.getItem('token')
  if (token) {
      config.headers.authorization =  token
  }
  return config;
}, (err) => {
  return Promise.reject(err)
})

// 3.响应拦截器
//3-1添加响应拦截器

instance.interceptors.response.use(response => {
  // 统一处理响应提示
  if (response.data.code === 0) {
      Message({
          type: "success",
          message: response.data.msg
      })
  }
  if (response.data.code === 1002) {
      Message({
          type: "error",
          message: response.data.msg
      })
  }
  // 对响应数据做点什么
  return response;
});

//暴露
export default instance;
