const express = require('express')

module.exports = {
    gameLaunch: (req, res) => {
        app.use(express.static(path.join(__dirname, 'gameFiles')));
        res.render('../gameFiles/index')
    }

}