/*
 * @Author: saber2pr 
 * @Date: 2019-03-22 18:20:38 
 * @Last Modified by:   saber2pr 
 * @Last Modified time: 2019-03-22 18:20:38 
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