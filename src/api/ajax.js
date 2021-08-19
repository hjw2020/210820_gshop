// ajax请求函数
// 返回值是一个promise对象,它的值为服务器返回的数据

import axios from 'axios'

export default function ajax (url = '', data = {}, type = 'GET') {
  return new Promise((resolve,reject) =>{
    // 接收axios返回的promise对象
    let promise;
    // get方法请求
    if (type === 'GET') {
      // 准备url query 参数
      let dataStr = ''; // 把data拼接成query参数字符串
      // 遍历data对象拼接成query参数字符串，此时query参数字符串末尾会多一个&
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&';
      })
      if (dataStr !== '') {
        // 去掉query参数字符串末尾多余的&
        dataStr = dataStr.substring(0,dataStr.lastIndexOf('&'));
        // 拼接完整的url
        url += '?' + dataStr;
      }
      // 发送get请求
      promise = axios.get(url);
    } else {
      // 发送post请求
      promise = axios.post(url, data);
    }

    // 把ajax函数返回的promise对象的resolve和reject函数类型参数绑定给promise中状态回调函数，
    // 实现把服务器返回的数据response.data传递到ajax函数返回的promise对象中
    promise.then(response => {
      resolve(response.data);
    }).catch(error => {
      reject(error)
    })
  })
}
