const Forum = require('../../../views/game/models/Forum')

module.exports = {
    addBoardCat: (req, res) => {
        if (req.body.newCat === '') {
            req.flash('errors', 'Category field cannot be empty')
            console.log(`redirecting!`);
            return res.redirect('/admin/add-category')
        }

        const newCat = new Forum
        newCat.category.name = req.body.newCat;
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
    }
}