/*
自定义日期时间过滤器
 */
import moment from 'moment'
import Vue from 'vue'

Vue.filter('dateString', (value, format) => {
  return moment(value).format(format || 'YYYY-MM-DD HH-mm-ss')
})
