var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index')
});

router.get('/home', (req, res) => {
  res.render('home/home')
})

module.exports = router;
