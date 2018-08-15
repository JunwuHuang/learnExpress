const express = require('express')
const path = require('path')

let app = express()

app.use(express.static('static'))

app.get('/login', (request, response) => {
    let targetPath = path.join(__dirname, './template/login.html')
    response.sendFile(targetPath)
})

app.get('/regist', (request, response) => {
    let targetPath = path.join(__dirname, './template/regist.html')
    response.sendFile(targetPath)
})

app.listen(3000, () => {
    console.log('Server is running at port:3000');
})