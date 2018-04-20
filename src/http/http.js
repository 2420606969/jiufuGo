import Vue from 'vue'
import axios from 'axios'
import { ToastPlugin, AlertPlugin } from 'vux'

//axios.defaults.timeout = 5000; //响应时间

axios.interceptors.request.use(function(config) {
  //在发送请求之前做一些事情
  return config;
}, function(error) {
  // 请求错误做一些事情
  return Promise.reject(error);
});

axios.interceptors.response.use(function(response) {
  //对响应数据做一些处理
  return response;
}, function(error) {
  // 对响应失败做一些处理
  return Promise.reject(error);
});


// if (process.env.NODE_ENV !== 'production') {
//   // 正式环境
//   let host = location.origin
//   console.log("正试环境host")
// } else {
//   // 测试环境
//   //let host = 'http://localhost/'
//   let host = 'http://192.168.150.199:8081/'
//   console.log("测试环境host")
// }

//get封装
export function getAjax(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
        params: params
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err)
      })
  })
}
//post封装
export function postAjax(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}
