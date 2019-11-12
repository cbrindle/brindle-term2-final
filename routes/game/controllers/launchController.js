

module.exports = {
    gameLaunch: (req, res) => {
        
        res.render('gameLaunch')
    },

    messageLaunch: (req, res) => {
        window.open('http://tfs-forum.forumotion.com/')
        res.redirect('/home')
    }

}