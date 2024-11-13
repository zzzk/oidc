// Part 1, import dependencies
const express = require('express');
const router = express.Router();
const passport = require('passport');
const { Strategy, discoverAndCreateClient } = require('passport-curity');

// Part 2, configure authentication endpoints
router.get('/login', passport.authenticate('curity'));
router.get('/callback', passport.authenticate('curity', { failureRedirect: '/login' }), (req, res) => {
    res.redirect('/user');
});

// Part 3, configuration of Passport
const getConfiguredPassport = async () => {

    // Part 3a, discover Keycloak Server metadata and configure the OIDC client
    const client = await discoverAndCreateClient({
      //  http://localhost:8087/auth/realms/test
      //http://localhost:8087/realms/test/.well-known/openid-configuration  
     // http://localhost:8087/realms/test/protocol/openid-connect/auth?client_id=test&scope=openid%20profile&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&state=yfmldVw-S_jAVw5P77tSnAB6vk4QQmBVxVA3JyBb1pE&code_challenge=9IJ2xucW31bg1YpUbL_wOyNhk_1ZqjHiXeKY4vwBYL0&code_challenge_method=S256
        issuerUrl: 'http://localhost:8087/realms/test',
        clientID: "test",
        clientSecret: "Secr3t",
        redirectUris: ["http://localhost:3000/callback"]
    });

    // Part 3b, configure the passport strategy
    const strategy = new Strategy({
        client,
        params: {
            scope: "openid profile"
        }
    }, function(accessToken, refreshToken, profile, cb) {
        return cb(null, { profile });
    });

    // Part 3c, tell passport to use the strategy
    passport.use(strategy);

    // Part 3d, tell passport how to serialize and deserialize user data
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    return passport;
};

// Part 4, export objects
exports = module.exports;
exports.getConfiguredPassport = getConfiguredPassport;
exports.passportController = router;