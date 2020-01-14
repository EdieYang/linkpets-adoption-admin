/* eslint-disable */
require('script-loader!file-saver');
import JSZip from 'jszip'

export function export_txt_to_zip(th, jsonData, txtName, zipName) {
  const zip = new JSZip()
  const txt_name = txtName || '文本'
  const zip_name = zipName || '压缩包'
  const data = jsonData
  let txtData = `${th}\r\n`
  data.forEach((row) => {
    let tempStr = ''
    tempStr = row.toString()
    txtData += `${tempStr}\r\n`
  })
  zip.file(`${txt_name}.txt`, txtData)
  zip.generateAsync({type:"blob"}).then((blob) => {
    saveAs(blob, `${zip_name}.zip`)
  }, (err) => {
    alert('导出失败')
  })
}

export function export_img_to_zip(jsonData, zipName, callback) {
  console.log(jsonData)
  const zip = new JSZip()
  const zip_name = zipName || '压缩包'
  jsonData.forEach((row) => {
    zip.file(`${row.name}.png`, row.data, {base64: true})
  })
  // zip.file(`${txt_name}.png`, jsonData, {base64: true})
  zip.generateAsync({type:"blob"}).then((blob) => {
    saveAs(blob, `${zip_name}.zip`)
    callback()
  }, (err) => {
    alert('导出失败')
  })
}