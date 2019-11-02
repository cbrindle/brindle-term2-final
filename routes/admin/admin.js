const express = require('express');
const router = express.Router();
const messageBoardController = require('./controllers/messageBoardController')

router.get('/', (req, res) => {
    if (req.isAuthenticated() && req.user.admin === true) {
        res.render('admin/admin')
    } else {
        req.flash('errors', 'You do not have credentials to access the admin section')
        res.redirect('/home')
    }
})

router.get('/add-category', (req, res) => {
    res.render('admin/add-category')
})

router.post('/add-category', messageBoardController.addBoardCat)

module.exports = router;