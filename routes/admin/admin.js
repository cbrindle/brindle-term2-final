const express = require('express');
const router = express.Router();

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

module.exports = router;