const express = require('express');
const router = express.Router();

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


router.get('/launch', )

module.exports = router;