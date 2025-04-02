const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Admin = require("../model/admin.model");

passport.use(new LocalStrategy(
    { usernameField: 'email' },
    async (username, password, done) => {
        try {
            let adminRec = await Admin.findOne({ email: username });
            if (adminRec) {
                if (password === adminRec.password) {
                    return done(null, adminRec);
                } else {
                    return done(null, false);
                }
            } else {
                return done(null, false);
            }
        } catch (error) {
            return done(error);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        let adminRec = await Admin.findById(id);
        done(null, adminRec);
    } catch (error) {
        done(error, null);
    }
});

passport.checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.redirect("/");
    }
};

passport.setAuthenticateUser = (req, res, next) => {
    res.locals.user = req.isAuthenticated() ? req.user : null;
    next();
};

module.exports = passport;
