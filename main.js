/*
 * @Author: saber2pr 
 * @Date: 2019-03-22 11:55:31 
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-03-22 18:36:55
 */
var name

/**
 * isType
 *
 * @param {*} event
 * @param {'csv'|'json'} type
 * @returns
 */
function isType(event, type) {
  return event.target['files'][0].name.split('.')[1] === type
}
/**
 * onCsvChange
 *
 * @param {Event} event
 */
function onCsvChange(event) {
  var value = event.target.value
  var json = JSON.stringify(toJson(value), null, 2)
  document.getElementById('json').value = json
  download('download', name, document.getElementById('csv').value)
}
/**
 * onJsonChange
 *
 * @param {Event} event
 */
function onJsonChange(event) {
  var value = event.target.value
  var csv = toCsv(value)
  document.getElementById('csv').value = csv
  download('download', name, document.getElementById('json').value)
}

document.getElementById('input').addEventListener('change', function (event) {
  ReaderAsync(event.target['files'][0]).then(function (res) {
    if (isType(event, 'csv')) {
      document.getElementById('csv').value = res
      return toJson(res)
    } else if (isType(event, 'json')) {
      document.getElementById('json').value = res
      return toCsv(res)
    } else {
      alert('文件格式错误!')
    }
  }).then(function (res) {
    var content
    if (isType(event, 'csv')) {
      name = event.target['files'][0].name.replace('csv', 'json')
      content = JSON.stringify(res, null, 2)
      document.getElementById('json').value = content
    } else if (isType(event, 'json')) {
      name = event.target['files'][0].name.replace('json', 'csv')
      content = res
      document.getElementById('csv').value = res
    }
    download('download', name, content)
  })
})