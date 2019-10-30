const userValidation = (req, res, next) => {
    req.checkBody('name', 'Name is required').notEmpty()
    req.checkBody('email', 'Email is required').notEmpty()
    req.checkBody('password', 'Password is required').notEmpty()

    req.flash('errorValidate', req.validationErrors())

    next()
}

module.exports = userValidation