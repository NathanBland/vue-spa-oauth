module.exports = (express) => {
  const router = express.Router()
  const jwt = require('jsonwebtoken')

  router.use('/auth', require('./auth')(express))
  // router.use('/user', require('./users')(express))
  // router.use('/post', require('./posts')(express))
  // router.use('/feed', require('./feed')(express))
  // router.use('/search', require('./search')(express))
  router.get('/', (req, res, next) => {
    console.log('route hit')
    return res.json({msg: 'Welcome to the api'})
  })
  return router
}