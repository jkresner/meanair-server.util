var colors = require('colors')

module.exports = function(env, overrides, envFile) {

  var config            = require('./configure')(env, overrides, envFile)
  var instrument        = require('./instrument')(config.log)
  var hooks             = require('./hooks')()

  global.moment         = require('moment-timezone')
  global.util           = require('meanair-shared.util')
  var _                 = require('lodash')
  _.idsEqual            = util.MongoUtil.idsEqual
  _.selectFromObj       = util.ObjectUtil.select
  _.wrapFnsOfObject     = util.ObjectUtil.wrapFns
  global._              = _

  global.$log           = instrument.log
  global.$time          = instrument.time
  global.$lapse         = instrument.timeLapse
  global.$app           = (msg) => instrument.timeLapse('app', msg)
  global.$error         = instrument.error
  global.$request       = instrument.request

  global.$require       = hooks.$require
  global.$requireIndex  = hooks.$requireIndex
  global.$requireLogic  = hooks.$requireLogic

  return { config }

}