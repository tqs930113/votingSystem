export default {
  set: function (name, value, expires, path, domain, secure) {
    var cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(value)
    if (expires instanceof Date) {
      cookieText += ';expires=' + expires.toGMTString()
    }
    if (path) {
      cookieText += ';path=' + path
    }
    if (domain) {
      cookieText += ';domain=' + domain
    }
    if (secure) {
      cookieText += ';secure'
    }
    document.cookie = cookieText
    console.log(cookieText + '----------cookie : ' + document.cookie)
  },
  get: function (name) {
    var cookieName = encodeURIComponent(name) + '='
    var cookieStart = document.cookie.indexOf(cookieName)
    var cookieValue = null
    if (cookieStart > -1) {
      var cookieEnd = document.cookie.indexOf(';', cookieStart)
      if (cookieEnd === -1) {
        cookieEnd = document.cookie.length
      }
      cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd))
    }
    return cookieValue
  },
  delete: function (name, path, domain, secure) {
    this.set(name, '', new Date(0), domain, path)
  },
  setCookieDate: function (day) {
    var date = null
    if (typeof day === 'number' && day > 0) {
      date = new Date()
      console.log(date)
      date.setTime(date.getTime() + day * 24 * 60 * 60 * 1000)
    } else {
      throw new Error('!!')
    }
    return date
  }
}
