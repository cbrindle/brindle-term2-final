const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index')
});

router.get('/home', (req, res) => {
  if (req.isAuthenticated()) {
    return res.render('game/main')
  } else {
    res.render('home/home')
  }
})

module.exports = router;
