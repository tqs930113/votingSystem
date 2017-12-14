import axios from 'axios'
import config from './config'
import Qs from 'qs'

// axios(config);
class API {
  get (param) {
    return axios.get(param.url, config)
  }
  post (param) {
    return axios.post(param.url, Qs.stringify(param.datas), config)
  }
  put (param) {
    return axios.put(param.url, Qs.stringify(param.datas), config)
  }
  delete (param) {
    return axios.delete(param.url, config)
  }
  reqSuccess (obj, msg) {
    obj.$message({
      message: msg,
      type: 'success'
    })
  }
  reqFail (obj, msg) {
    obj.$message({
      message: msg,
      type: 'error'
    })
  }
  formatDate (nows, operation, isChinese) {
    var now = new Date(nows)
    var year = now.getFullYear()
    var month = now.getMonth() + 1
    month = month.toString().length <= 1 ? ('0' + month.toString()) : month
    var date = now.getDate()
    date = date.toString().length <= 1 ? ('0' + date.toString()) : date
    var hour = now.getHours()
    hour = hour.toString().length <= 1 ? ('0' + hour.toString()) : hour
    var minute = now.getMinutes().length <= 1 ? '0' + now.getMinutes() : now.getMinutes()
    minute = minute.toString().length <= 1 ? ('0' + minute.toString()) : minute
    var second = now.getSeconds().length <= 1 ? '0' + now.getSeconds() : now.getSeconds()
    second = second.toString().length <= 1 ? ('0' + second.toString()) : second
    if (isChinese) {
      return year + '年' + month + '月' + date + '日 ' + hour + '时' + minute + '分' + second + '秒'
    }
    return year + operation + month + operation + date + ' ' + hour + ':' + minute + ':' + second
  }
}
export default API
