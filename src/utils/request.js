import axios from 'axios'
import QS from 'qs'
import checkStatus from '@/utils/check-status'

const instance = axios.create({
  timeout: 3000,
  withCredentials: true
})

instance.interceptors.request.use(config => {
  if (!config.headers['Content-Type']) {
    config.headers['Content-Type'] = 'application/json; charset=UTF-8'
  }
  if (config.method === 'post') {
    if (config.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      // 服务器收到的raw body(原始数据) name=nowThen&age=18。即将对象自动转换为带&的url
      config.data = QS.stringify(config.data)
    }
  }
  return Promise.resolve(config)
}, error => {
  return Promise.reject(error)
})

/**
 * 这里的code分为两部分，一部分是浏览器对接口访问得到的状态码。即常见的200、302、400、404、500等。
 * 拦截器到底走onFulfilled还是onRejected就是通过此此码里确定,目前看来，除了200，其它都走onRejected
 * 另外，除开浏览器返回的code外，我们的后端还会定义一些自己的code作为提示，这些code是跟业务相关的
 * 是基于浏览器状态200的情况下做进一步的业务异常提示，此时对状态码的解析就要写着onFulfilled逻辑里面
 */
instance.interceptors.response.use(res => { // 状态码为200时的响应
  const {
    status,
    data
  } = res
  console.log(status, data)
  return Promise.resolve(checkStatus(res))
}, error => { // 400、404、500之类的请求此处被捕获。
  const {
    response
  } = error
  console.log(response.status)
  console.log(response.data) // 可以获取异常返回的具体信息
  return Promise.reject(checkStatus(error.response)) // 此处返回error，如果调用处有catch去接收，则error会被传递。否则不进then处。另，这里要return，否则异常都无处可以获取
})

export default instance
