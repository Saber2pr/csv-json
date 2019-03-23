/*
 * @Author: saber2pr
 * @Date: 2019-03-22 18:21:27
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-03-23 16:45:14
 */
/**
 * toCsv
 *
 * @param {string} json
 * @returns {string}
 */
function toCsv(json) {
  if (typeof json !== 'string') {
    throw new Error('the json must be string! JSON.stringify?')
  }

  var objs = JSON.parse(json)

  if (!Array.isArray(objs)) {
    throw new Error('the json must be from an object array!')
  }

  var head = Object.keys(objs[0])
  var result = objs.map(function (obj) {
    return head
      .map(function (key) {
        return obj[key]
      })
      .join(',')
  })

  result.unshift(head.join(','))

  return result.join('\n')
}

if (typeof module !== 'undefined') {
  module.exports = {
    toCsv: toCsv
  }
}