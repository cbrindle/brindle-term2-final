const User = require('../models/User')
const bcrypt = require('bcryptjs')
const getGravatar = require('../utils/gravatar')
const nodemailer = require('nodemailer')
require('dotenv').config()

module.exports = {
    signup: (req, res, next) => {
        if (req.body.name === '' || req.body.email === '' || req.body.password === '' || req.body.password2 === '') {
            req.flash('errors', 'All fields must be filled out')
            return res.redirect('/user/signup')
        }
        if (req.body.password != req.body.password2) {
            req.flash('errors', 'Passwords do not match')
            return res.redirect('/user/signup')
        }
        User.findOne({ email: req.body.email }, (err, user) => {
            if (err) {
                throw Error('error when executing findOne')
            }
            if (user) {
                req.flash('errors', 'User already exists')
                return res.redirect(301, '/user/signup')
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
                    res.status(302).redirect('/user/profile')
                    return
                }
            })
        }
        if (req.body.password === '' && (req.body.password2 != '' || req.body.password3 != '')) {
            req.flash('errors', 'Must enter your old password to change it')
            res.status(302).redirect('/user/profile')
            return
        }

        if (req.body.password2 != '' && req.body.password3 != '') {
            if (req.body.password2 != req.body.password3) {
                req.flash('errors', 'New password must match CONFIRM')
                res.status(302).redirect('/user/profile')
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

            req.user.save()
            req.flash('success', 'User updated successfully')
            res.status(302).redirect('/user/profile')
            return

        }, 200);
    },

    recoverPassword: (req, res) => {
        User.findOne({ email: req.body.email })
            .then(user => {
                if (!user) {
                    req.flash('errors', 'Email address not found in database')
                    res.redirect('/user/passwordrecovery')
                } else {
                    user.passchange = true
                    user.save()
                        .then(user => {
                            console.log(user.passchange);
                            let transporter = nodemailer.createTransport({
                                service: 'gmail',
                                auth: {
                                    user: 'tfs.userrecovery@gmail.com',
                                    pass: process.env.EMAIL_PASS
                                }
                            })

                            let mailOptions = {
                                from: 'tfs.userrecovery@gmail.com',
                                to: `${req.body.email}`,
                                subject: 'Tales from Swiftfell Account Recovery',
                                html: `Please <a href="https://tfs-chapter1.herokuapp.com/user/passwordrecovery/${user._id}">CLICK HERE</a> to change your password.`
                            }

                            transporter.sendMail(mailOptions, (err, info) => {
                                if (err) {
                                    console.log(err);
                                    req.flash('errors', 'error sending email');
                                    res.redirect('/user/passwordrecovery')
                                } else {
                                    console.log(`Email sent: ${info.response}`);
                                    req.flash('success', `An email has been sent to "${user.email}" with your account information`);
                                    res.redirect('/user/passwordrecovery')
                                }
                            })
                        })
                        .catch(err => {
                            throw Error(err)
                        })
                }
            })
            .catch(err => {
                throw Error(err)
            })
    },

    updatePassword: (req, res) => {
        User.findOne({ _id: req.params.email })
            .then(user => {
                if (req.body.password === '' || req.body.password === '') {
                    req.flash('errors', 'Password field cannot be blank')
                    res.redirect(`/user/passwordrecovery/${user.email}`)
                }
                if (req.body.password != req.body.password2) {
                    req.flash('errors', 'Passwords MUST match')
                    res.redirect(`/user/passwordrecovery/${user.email}`)
                }

                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        throw new Error('error from 25')
                    }
                    user.password = hash
                    user.passchange = false
                    user.save()
                        .then(newUser => {
                            console.log(newUser.password);
                            req.flash('success', 'You have updated your password successfully!')
                            res.redirect('/user/signin')
                        })
                        .catch(err => {
                            throw Error(err)
                        })
                    }
                )
            })
            .catch(err => {
                throw Error(err)
            })
    }
}