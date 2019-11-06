const express = require('express')
const path = require('path');

module.exports = {
    gameLaunch: (req, res) => {
        let app = express();
        app.use(express.static(path.join(__dirname, 'gameFiles')));
        res.render('../gameFiles/index')
    }

}