module.exports = (express) => {
  const router = express.Router()
  const passport = require('passport')
  const TwitterStrategy = require('passport-twitter').Strategy
  const config = require('../../config').twitter
  const User = require('../../models/user')
  
  passport.use(new TwitterStrategy({
    consumerKey: config.TWITTER_CONSUMER_KEY,
    consumerSecret: config.TWITTER_CONSUMER_SECRET,
    callbackURL: "https://a975ecb4.ngrok.io/api/auth/twitter/callback"
  }, (token, tokenSecret, profile, done) => {
    User.findOrCreate({
      'twitter.id': profile.id
    }, (err, user) => {
        if (err) { return done(err) }
        console.log('user:', user)
        done(null, user)
      })
    }
  ))
  // Redirect the user to Twitter for authentication.  When complete, Twitter
  // will redirect the user back to the application at
  //   api/auth/twitter/callback
  router.get('/', passport.authenticate('twitter'))

  // Twitter will redirect the user to this URL after approval.  Finish the
  // authentication process by attempting to obtain an access token.  If
  // access was granted, the user will be logged in.  Otherwise,
  // authentication has failed.
  router.get('/callback',
    passport.authenticate('twitter', { successRedirect: '/success',
                                      failureRedirect: '/login' }))
  return router
}