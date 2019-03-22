/*
 * @Author: saber2pr 
 * @Date: 2019-03-22 18:21:27 
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-03-22 18:29:29
 */
/**
 * toCsv
 *
 * @param {string} json
 */
function toCsv(json) {
  var objs = JSON.parse(json)
  var head = Object.keys(objs[0])
  var result = objs.map(function (obj) {
    var values = []
    head.forEach(function (key) {
      values.push(obj[key])
    })
    return values.join(',')
  })
  result.unshift(head.join(','))

  return result.join('\n')
}