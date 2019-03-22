/*
 * @Author: saber2pr 
 * @Date: 2019-03-22 18:21:02 
 * @Last Modified by:   saber2pr 
 * @Last Modified time: 2019-03-22 18:21:02 
 */
/**
 * toJson
 *
 * @param {string} csv
 */
function toJson(csv) {
  var arr = csv.split('\n').map(function (raw) {
    return raw.split(',')
  })
  var head = arr[0]
  var data = arr.slice(1).filter(function (raw) {
    return !raw.includes('')
  })

  return data.map(function (raw) {
    var obj = {}
    raw.forEach(function (value, index) {
      obj[head[index]] = value
    })
    return obj
  })
}