const Forum = require('../../game/models/Forum')
const moment = require('moment')

module.exports = {
    addBoardCat: (req, res) => {
        if (req.body.newCat === '' || req.body.description === '') {
            req.flash('errors', 'Cannot have empty fields')
            return res.redirect('/admin/add-category')
        }

        const newCat = new Forum
        newCat.category.name = req.body.newCat;
        newCat.category.description = req.body.description;
        newCat.save()
            .then(category => {
                req.flash('success', `Category "${req.body.newCat}" created.`)
                return res.redirect('/admin/add-category')
            })
            .catch(err => {
                throw Error(err)
            })
    },

    loadCategories: (req, res) => {
        if (req.isAuthenticated()) {
            Forum.find({})
                .then(data => {
                    res.render('game/messageBoard', { data: data })
                })
                .catch(err => {
                    throw Error(err)
                })
        } else {
            res.redirect('/home/home')
        }
    },

    loadTopic: (req, res) => {
        if (req.isAuthenticated()) {
            Forum.findOne({ _id: req.params.category })
                .then(data => {
                    res.render('game/mb-category', { data: data })
                })
                .catch(err => {
                    throw Error(err)
                })
        } else {
            res.render('/home')
        }
    },

    updateTopics: (req, res) => {
        Forum.findOne({ _id: req.params.category })
            .then(data => {
                data.category.topics.push({
                    subject: req.body.subjectText,
                    posts: [{
                        text: req.body.postText,
                        author: req.user.profile.name,
                    }]
                })
                data.save()
                    .then(newData => {
                        res.redirect(`/game/messageBoard/${req.params.category}`)
                    })
                    .catch(err => {
                        throw Error(err)
                    })
            })
            .catch(err => {
                throw Error(err)
            })
    }
}