/*
 * @Author: saber2pr 
 * @Date: 2019-03-22 18:21:02 
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-03-23 16:44:50
 */
/**
 * toJson
 *
 * @param {string} csv
 * @returns {string}
 */
function toJson(csv) {
  if (typeof csv !== 'string') {
    throw new Error('the csv must be string!')
  }

  var arr = csv.split('\n').map(function (raw) {
    return raw.split(',')
  })
  var head = arr[0]

  var data = arr.slice(1).filter(function (raw) {
    return !raw.includes('')
  }).map(function (raw) {
    return raw.reduce(function (out, value, index) {
      out[head[index]] = value
      return out
    }, {})
  })

  return JSON.stringify(data, null, 2)
}

if (typeof module !== 'undefined') {
  module.exports = {
    toJson: toJson
  }
}