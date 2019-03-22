/*
 * @Author: saber2pr 
 * @Date: 2019-03-22 18:20:36 
 * @Last Modified by:   saber2pr 
 * @Last Modified time: 2019-03-22 18:20:36 
 */
/**
 * download
 *
 * @param {string} id
 * @param {string} fileName
 * @param {string} content
 */
function download(id, fileName, content) {
  var aLink = document.getElementById(id);
  var blob = new Blob([content]);
  var evt = document.createEvent("HTMLEvents");
  evt.initEvent("click", false, false);
  aLink.download = fileName;
  aLink.href = URL.createObjectURL(blob);
  aLink.dispatchEvent(evt);
}