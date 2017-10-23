const
  passport = require('passport'),
  router = require('express').Router(),
  GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
  User = require('../user/user.model'),
  googleConfig = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  strategy = new GoogleStrategy(googleConfig, (token, refreshToken, profile, done) => {
    const
      googleId = profile.id,
      name = profile.displayName,
      email = profile.emails[0].value
    console.log(profile)

    User.find({where: {googleId}})
      .then(user => user
        ? done(null, user)
        : User.create({name, email, googleId})
          .then(user => done(null, user))
      )
      .catch(done)
  })

passport.use(strategy)

router
  .get('/', passport.authenticate('google', {scope: 'email'}))

  .get('/callback', passport.authenticate('google', {
    successRedirect: '/account',
    failureRedirect: '/login'
  }))

module.exports = router
