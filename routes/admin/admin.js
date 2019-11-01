const express = require('express');
const router = express.Router();
const messageBoardController = require('./controllers/messageBoardController')

router.get('/', (req, res) => {
    res.render('admin/admin')
})

router.get('/add-category', (req, res) => {
    res.render('admin/add-category')
})

router.post('/add-category', messageBoardController.addBoardCat)

module.exports = router;