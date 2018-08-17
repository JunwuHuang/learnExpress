const express = require('express')
const router = express.Router()
const path = require('path')
const helper = require('../tools/helper')
const svgCaptcha = require('svg-captcha');

router.get('/login', (request, response) => {
    let targetPath = path.join(__dirname, '../template/login.html')
    response.sendFile(targetPath)
})

router.post('/login', (request, response) => {
    let username = request.body.username
    let password = request.body.password
    let vcode = request.body.vcode.toLowerCase()
    if (vcode == request.session.captcha) {
        helper.find('admin', {
            username,
            password
        }, (result) => {
            if (result.length != 0) {
                request.session.username = username
                response.redirect('/student/index')
            } else
                helper.tips(response, '用户名或密码错误！', '/manage/login')
        })
    } else {
        helper.tips(response, '验证码错误，请重新输入', '/manage/login')
    }
})

router.get('/regist', (request, response) => {
    let targetPath = path.join(__dirname, '../template/regist.html')
    response.sendFile(targetPath)
})

router.post('/regist', (request, response) => {
    // let tem = ''
    // request.on('data', (chunk) => {
    //     tem += chunk
    // })
    // request.on('end', () => {
    //     console.log(tem);
    //     response.send(tem)
    // })

    let username = request.body.username
    let password = request.body.password

    helper.find('admin', {
        username
    }, (result) => {
        if (result.length == 0) {
            helper.insertOne('admin', {
                username,
                password
            }, (result) => {
                helper.tips(response, '注册成功！', '/manage/login')
            })
        } else {
            helper.tips(response, '该用户名已被注册！', '/manage/regist')
        }
    })
})

router.get('/captcha', (request, response) => {
    var captcha = svgCaptcha.create();
    request.session.captcha = captcha.text.toLowerCase();
    response.type('svg'); // 使用ejs等模板时如果报错 response.type('html')
    response.status(200).send(captcha.data);
})

module.exports = router;