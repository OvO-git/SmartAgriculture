const express = require('express')
const admin = express.Router()
const Eqdm = require('../model/eqdm')
const User = require('../model/user')

admin.get('/login', (req, res) => {
    res.render('admin/login')
})
admin.get('/ag_eq', async (req, res) => {
    let eqdms = await Eqdm.querytEqdm('SELECT * FROM `ag_eq`', null)
    let page = req.query.page || 1
    let pagesize = 10
    let count = eqdms.length
    let total = Math.ceil(count / pagesize)
    let start = (page - 1) * pagesize
    eqdms = await Eqdm.querytEqdm('SELECT * FROM `ag_eq` LIMIT ?,?', [start, pagesize])
    res.render('admin/ag_eq', {
        eqdms,
        page,
        total
    })
})
admin.get('/user', async (req, res) => {
    let users = await User.querytUser('SELECT * FROM `user`', null)
    let page = req.query.page || 1
    let pagesize = 10
    let count = users.length
    let total = Math.ceil(count / pagesize)
    let start = (page - 1) * pagesize
    users = await User.querytUser('SELECT * FROM `user` LIMIT ?,?', [start, pagesize])
    res.render('admin/user', {
        users,
        page,
        total
    })
})

admin.post('/login', async (req, res) => {
    const {
        email,
        password
    } = req.body
    if (email.trim().length == 0 || password.trim().length == 0) {
        return res.status(400).render('admin/error', {
            msg: '邮件错误或者密码错误'
        })
    }
    let user = await User.querytUser('SELECT * FROM `user` WHERE `email`=?', email)
    if (user.length > 0) {
        if (password == user[0].password) {
            req.session.username = user[0].username
            req.app.locals.username = req.session.username
            res.redirect('/admin/ag_eq')
        } else {
            res.status(400).render('admin/error', {
                msg: '邮箱地址或者密码错误'
            })
        }
    } else {
        res.status(400).render('admin/error', {
            msg: '邮箱地址或者密码错误'
        })
    }
})
admin.get('/logout', (req, res) => {
    req.session.destroy(function () {
        res.clearCookie('connect.sid')
        res.redirect('/admin/login')
    })
})
admin.get('/eqdm-edit', async (req, res) => {
    const eq_id = req.query.id
    if (eq_id) {
        let ag_eq = await Eqdm.querytEqdm('SELECT * FROM `ag_eq` WHERE `eq_id`=?', eq_id)
        res.render('admin/eqdm-edit', {
            ag_eq: ag_eq[0],
            link: '/admin/eqdm-modify?id=' + eq_id,
            button: '修改'
        })
    } else {
        res.render('admin/eqdm-edit', {
            link: '/admin/eqdm-edit',
            button: '添加'
        })
    }

})
admin.post('/eqdm-edit', async (req, res) => {
    const {
        eq_dm,
        eq_name,
        eq_state,
        eq_usage_tm
    } = req.body
    let sql = 'INSERT INTO `ag_eq`(eq_id,eq_dm,eq_name,eq_state,eq_usage_tm) VALUES(?,?,?,?,?)'
    let sql_params = [null, eq_dm, eq_name, eq_state, eq_usage_tm]
    await Eqdm.querytEqdm(sql, sql_params)
    res.redirect('/admin/ag_eq')
})
admin.post('/eqdm-modify', async (req, res) => {
    const eq_id = req.query.id
    const {
        eq_dm,
        eq_name,
        eq_state,
        eq_usage_tm
    } = req.body
    let sql = 'UPDATE `ag_eq` SET eq_dm=?,eq_name=?,eq_state=?,eq_usage_tm=? WHERE eq_id=?'
    let sql_params = [eq_dm, eq_name, eq_state, eq_usage_tm,eq_id]
    await Eqdm.querytEqdm(sql, sql_params)
    res.redirect('/admin/ag_eq')
})

admin.get('/delete', async (req, res) => {
    const eq_id = req.query.id
    let sql = 'DELETE FROM `ag_eq` WHERE eq_id=?'
    let sql_params = eq_id
    await Eqdm.querytEqdm(sql, sql_params)
    res.redirect('/admin/ag_eq')
})

admin.get('/user-edit', async (req, res) => {
    const id = req.query.id
    if (id) {
        let user = await User.querytUser('SELECT * FROM `user` WHERE `id`=?', id)
        res.render('admin/user-edit', {
            user: user[0],
            link: '/admin/user-modify?id=' + id,
            button: '修改'
        })
    } else {
        res.render('admin/user-edit', {
            link: '/admin/user-edit',
            button: '添加'
        })
    }

})
admin.post('/user-edit', async (req, res) => {
    const {
        username,
        email,
        password,
        role,
        state
    } = req.body
    let sql = 'INSERT INTO `user`(id,username,email,password,role,state) VALUES(?,?,?,?,?,?)'
    let sql_params = [null, username, email, password, role, state]
    await User.querytUser(sql, sql_params)
    res.redirect('/admin/user')
})
admin.post('/user-modify', async (req, res) => {
    const id = req.query.id
    const {
        username,
        email,
        password,
        role,
        state
    } = req.body
    let sql = 'UPDATE `user` SET username=?,email=?,password=?,role=?,state=? WHERE id=?'
    let sql_params = [username, email, password, role, state, id]
    await User.querytUser(sql, sql_params)
    res.redirect('/admin/user')
})
admin.get('/delete', async (req, res) => {
    const id = req.query.id
    let sql = 'DELETE FROM `user` WHERE id=?'
    let sql_params = id
    await User.querytUser(sql, sql_params)
    res.redirect('/admin/user')
})
module.exports = admin