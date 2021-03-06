/*
 * @Author: saber2pr 
 * @Date: 2019-03-22 11:55:31 
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-03-23 16:12:22
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
  var json = toJson(value)
  document.getElementById('json').value = json
  updateDownload()
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
  updateDownload()
}
/**
 * updateDownload
 */
function updateDownload() {
  if (name.split('.')[1] === 'json') {
    download('download', name, document.getElementById('json').value)
  } else if (name.split('.')[1] === 'csv') {
    download('download', name, document.getElementById('csv').value)
  } else {
    alert('文件格式错误!')
  }
}

document.getElementById('input').addEventListener('change', function (event) {
  ReaderAsync(event.target['files'][0]).then(function (res) {
    if (isType(event, 'csv')) {
      name = event.target['files'][0].name.replace('csv', 'json')
      document.getElementById('csv').value = res
      document.getElementById('json').value = toJson(res)
    } else if (isType(event, 'json')) {
      name = event.target['files'][0].name.replace('json', 'csv')
      document.getElementById('json').value = res
      document.getElementById('csv').value = toCsv(res)
    } else {
      alert('文件格式错误!')
    }
    updateDownload()
  })
})