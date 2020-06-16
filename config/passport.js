const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('user');
const keys = require('./keys');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrPrivateKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload._id).select('email activeSchoolId role activeStatus access _profile')
        .then(user => {
          if (user) {
  
            return done(null, user);
          }
          return done(null, false);
        })  
         .catch(err => console.log(err));
    })
  );
};
