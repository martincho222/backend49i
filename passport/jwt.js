const passportJWT = require("passport-jwt");
const User = require("../models/userSchema");

const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

const config = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
    algorithms: process.env.JWT_ALGORITHM
};

const jwtStrategy = new JwtStrategy(config, async (payload, done) => {
    console.log("passportJWT", passportJWT);
    try {
        const user = await User.findById(payload.sub);
        if(!user){
            return done(null, false)
        }
        done(null, user)
    } catch (error) {
        done(error, false)
    }
})

module.exports = jwtStrategy;