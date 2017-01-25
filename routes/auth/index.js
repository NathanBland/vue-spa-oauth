const passport = require('passport')
const User = require('../../models/user')
module.exports = (express) => {
  const router = express.Router()
  router.use(passport.initialize())
  router.use(passport.session())
  router.use('/twitter', require('./twitter')(express))
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user)
    })
})
  return router
}