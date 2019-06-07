const fs = require('fs')
const log = require('../notes-app/log.js')

const dataBuffer = fs.readFileSync('1-json.json')
const data = dataBuffer.toString()
const jsonData = JSON.parse(data)

jsonData.name='Adrian'
jsonData.age=31

const dataAsString = JSON.stringify(jsonData)
fs.writeFileSync('1-json.json', dataAsString)

