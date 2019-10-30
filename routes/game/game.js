const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    res.send('hit GAME')
});

router.get('/messageBoard', (req, res) => {
    if (req.isAuthenticated()) {
        return res.render('game/messageBoard')
    } else {
        res.render('home/home')
    }
})

router.get('/instructions', (req, res) => {
    if (req.isAuthenticated()) {
        return res.render('game/instructions')
    } else {
        res.render('home/home')
    }
})

module.exports = router;