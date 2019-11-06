const express = require('express');
const router = express.Router();
const browserSync = require('browser-sync');
const path = require('path');

router.get('/', function (req, res, next) {
    res.send('hit GAME')
});


router.get('/game/messageboard', (req, res) => {
    res.render('game/messageboard')
})


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