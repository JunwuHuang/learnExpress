const express = require('express')
let router = express.Router()
const path = require('path')
const helper = require('../tools/helper')
const template = require('art-template')
const querystring = require('querystring')

router.use((request, response, next) => {
    if (!request.url != '/logout') {
        if (!request.session.username)
            helper.tips(response, '请先登录！', '/manage/login')
        else
            next()
    } else {
        next()
    }
})

router.get('/index', (request, response) => {
    let obj = request.query.search ? { studentname: { $regex: request.query.search } } : {}
    helper.find('student', obj, (result) => {
        let html = template(path.join(__dirname, '../template/index.html'), {
            data: result,
            username: request.session.username
        })
        response.send(html)
    })
})

router.get('/logout', (request, response) => {
    delete request.session.username
    response.redirect('/manage/login')
})

router.get('/add', (request, response) => {
    if (!request.session.username) {
        helper.tips(response, '请先登录！', '/manage/login')
    } else {
        let html = template(path.join(__dirname, '../template/add.html'), {
            username: request.session.username
        })
        response.send(html)
    }
})

router.post('/add', (request, response) => {
    helper.insertOne('student', request.body, (result) => {
        if (request.body.username) helper.tips(response, '添加失败！', '/student/add')
        else helper.tips(response, '添加完成！', '/student/index')
    })
})

router.get('/delete/:id', (request, response) => {
    let _id = request.params.id
    helper.deleteOne('student', {
        _id: helper.ObjectId(_id)
    }, (result) => {
        if(result.length != 0) {
            helper.tips(response, '删除成功！', '/student/index')
        }else {
            response.redirect('/student/index')
        }
    })
})

router.get('/edit/:id', (request, response) => {
    helper.find('student', { _id: helper.ObjectId(request.params.id) }, (result) => {
        if(result.length != 0){
            let html = template(path.join(__dirname, '../template/edit.html'), {
                data: result[0],
                username: request.session.username
            })
            response.send(html)
        }else {
            helper.tips(response, '没有查询到该条数据，请联系管理员！', '/student/index')
        }
    })
})

router.post('/edit/:id', (request, response) => {
    helper.updateOne('student', { _id: helper.ObjectId( request.params.id ) }, request.body, (result) => {
        response.redirect('/student/index')
    })
})

module.exports = router