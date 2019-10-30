const User = require('../models/User')
const bcrypt = require('bcryptjs')
const getGravatar = require('../utils/gravatar')

module.exports = {
    signup: (req, res, next) => {
        if (req.validationErrors()) {
            res.render('auth/signup')
            return
        }
        User.findOne({ email: req.body.email }, (err, user) => {
            if (err) {
                throw Error('error when executing findOne')
            }
            if (user) {
                req.flash('errors', 'User already exists')
                return res.redirect(301, '/users/signup')
            } else {
                const newUser = new User
                newUser.email = req.body.email
                newUser.profile.name = req.body.name
                newUser.profile.picture = getGravatar(req.body.email)

                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        throw new Error('error from 25')
                    }
                    newUser.password = hash
                    newUser.save()
                        .then(newUser => {
                            req.login(newUser, (err) => {
                                if (err) {
                                    throw Error(err)
                                } else {
                                    res.redirect('/home')
                                }
                            })
                        })
                        .catch(err => {
                            throw Error(err)
                        })
                })
            }
        })
    },

    updateProfile: (req, res) => {
        if (req.body.password != '') {
            bcrypt.compare(req.body.password, req.user.password, (err, result) => {
                if (err) {
                    throw err
                }
                if (!result) {
                    req.flash('errors', 'Old password is incorrect')
                    res.status(302).redirect('/api/users/profile')
                    return
                }
            })
        }
        if (req.body.password === '' && (req.body.password2 != '' || req.body.password3 != '')) {
            req.flash('errors', 'Must enter your old password to change it')
            res.status(302).redirect('/api/users/profile')
            return
        }

        if (req.body.password2 != '' && req.body.password3 != '') {
            if (req.body.password2 != req.body.password3) {
                req.flash('errors', 'New password must match CONFIRM')
                res.status(302).redirect('/api/users/profile')
                return
            } else if (req.body.password2 === req.body.password3) {
                bcrypt.hash(req.body.password2, 10, (err, hash) => {
                    if (err) {
                        throw new Error('error')
                    }
                    req.user.password = hash
                })
            }
        }

        setTimeout(() => {
            if (req.body.name != '') {
                req.user.profile.name = req.body.name
            }
            if (req.body.email != '') {
                req.user.email = req.body.email
            }
            if (req.body.address != '') {
                req.user.address = req.body.address
            }

            req.user.save()
            req.flash('success', 'User updated successfully')
            res.status(302).redirect('/api/users/profile')
            return

        }, 200);
    }
}