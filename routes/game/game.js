const express = require('express');
const router = express.Router();
const browserSync = require('browser-sync');
const path = require('path');
const messageBoardController = require('../admin/controllers/messageBoardController')

router.get('/', function (req, res, next) {
    res.send('hit GAME')
});


router.get('/messageBoard', messageBoardController.loadCategories)


router.get('/messageBoard/:category', messageBoardController.loadTopic)


router.post('/messageBoard/:category', messageBoardController.updateTopics)


router.get('/instructions', (req, res) => {
    if (req.isAuthenticated()) {
        return res.render('game/instructions')
    } else {
        res.render('home/home')
    }
})


router.get('/launch', (req, res) => {
    browserSync({server: path.join(__dirname, '../../gameFiles')})
    res.redirect('/home')
})

module.exports = router;