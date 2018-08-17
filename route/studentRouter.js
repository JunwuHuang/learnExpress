const express = require('express')
let router = express.Router()
const path = require('path')
const helper = require('../tools/helper')
const template = require('art-template')

router.get('/index', (request, response) => {
    if(!request.session.username){
        helper.tips(response, '请先登录！', '/manage/login')
    }else {
        let html = template(path.join(__dirname, '../template/index.html'), {
            username: request.session.username
        })
        response.send(html)
    }
})

router.get('/logout', (request, response) => {
    delete request.session.username
    response.redirect('/manage/login')
})

router.get('/add', (request, response) => {
    if(!request.session.username){
        helper.tips(response, '请先登录！', '/manage/login')
    }else {
        let html = template(path.join(__dirname, '../template/add.html'), {
            username: request.session.username
        })
        response.send(html)
    }
})

module.exports = router