/*
 * @Author: saber2pr 
 * @Date: 2019-03-22 18:21:27 
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-03-23 16:19:12
 */
/**
 * toCsv
 *
 * @param {string} json
 * @returns {string}
 */
function toCsv(json) {
  var objs = JSON.parse(json)
  var head = Object.keys(objs[0])
  var result = objs.map(function (obj) {
    return head.map(function (key) {
      return obj[key]
    }).join(',')
  })

  result.unshift(head.join(','))

  return result.join('\n')
}

if (typeof module !== 'undefined') {
  module.exports = {
    toCsv: toCsv
  }
}