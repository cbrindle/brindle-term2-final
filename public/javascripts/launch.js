

function launch() {
    const browserSync = require('browser-sync');
    browserSync({ server: `${__dirname}/gameFiles/` })
}