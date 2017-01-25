// get an instance of mongoose and mongoose.Schema
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const findOrCreate = require('mongoose-findorcreate')
// set up a mongoose model and pass it using module.exports
let User = new Schema({ 
  name: String, 
  twitterId: String,
  twitter: {
    id: String,
    token: String,
    displayName: String,
    username: String
  },
  someID: String
})
User.plugin(findOrCreate)
module.exports = mongoose.model('User', User) 