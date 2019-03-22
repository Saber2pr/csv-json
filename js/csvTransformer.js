/*
 * @Author: saber2pr 
 * @Date: 2019-03-22 11:55:31 
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-03-22 13:36:52
 */
/**
 * ReaderAsync
 *
 * @param {*} fileBlob
 * @returns {Promise<string>}
 */
function ReaderAsync(fileBlob) {
  return new Promise(function (resolve) {
    var reader = new FileReader()
    reader.readAsText(fileBlob)
    reader.onload = function () {
      resolve(reader.result)
    }
  })
}
/**
 * downloadFile
 *
 * @param {string} id
 * @param {string} fileName
 * @param {string} content
 */
function downloadFile(id, fileName, content) {
  var aLink = document.getElementById(id);
  var blob = new Blob([content]);
  var evt = document.createEvent("HTMLEvents");
  evt.initEvent("click", false, false);
  aLink.download = fileName;
  aLink.href = URL.createObjectURL(blob);
  aLink.dispatchEvent(evt);
}
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
/**
 * isCsvInput
 *
 * @param {Event} event
 */
function isCsvInput(event) {
  return event.target['files'][0].name.split('.')[1] === 'csv'
}
/**
 * isJsonInput
 *
 * @param {Event} event
 */
function isJsonInput(event) {
  return event.target['files'][0].name.split('.')[1] === 'json'
}

var name

document.getElementById('input').addEventListener('change', function (event) {
  ReaderAsync(event.target['files'][0]).then(function (res) {
    if (isCsvInput(event)) {
      document.getElementById('csv').value = res
      return toJson(res)
    } else if (isJsonInput(event)) {
      document.getElementById('json').value = res
      return toCsv(res)
    } else {
      alert('文件格式错误!')
    }
  }).then(function (res) {
    var content
    if (isCsvInput(event)) {
      name = event.target['files'][0].name.replace('csv', 'json')
      content = JSON.stringify(res, null, 2)
      document.getElementById('json').value = content
    } else if (isJsonInput(event)) {
      name = event.target['files'][0].name.replace('json', 'csv')
      content = res
      document.getElementById('csv').value = res
    }
    downloadFile('download', name, content)
  })
})
/**
 * onCsvChange
 *
 * @param {Event} event
 */
function onCsvChange(event) {
  var value = event.target.value
  document.getElementById('json').value = JSON.stringify(toJson(value), null, 2)
  downloadFile('download', name, document.getElementById('json').value)
}
/**
 * onJsonChange
 *
 * @param {Event} event
 */
function onJsonChange(event) {
  var value = event.target.value
  document.getElementById('csv').value = toCsv(value)
  downloadFile('download', name, document.getElementById('json').value)
}