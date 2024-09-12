import passport from "passport";
import { OAuth2Strategy } from "passport-google-oauth";
import { googleUser } from "../mongoos/Schema/googleUserSchema.mjs";
passport.serializeUser((user, done) => {
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  try {
    const theUser = googleUser.findById({ id: id }).lean();
    return theUser ? done(null, theUser) : done(null, null);
  } catch (err) {
    console.log(err);
  }
});

passport.use(
  new OAuth2Strategy(
    {
      clientID:
        "100063936134-bo9c0fs6eebpos2bnjaqgpji2l1s1018.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:3000/redirect",
    },
    async (accessToken, refreshToken, profile, done) => {
      let findUser;
      try {
        findUser = await googleUser.findOne({ id: profile.id });
        console.log("user", findUser);
      } catch (err) {
        return done(err, null);
      }
      try {
        if (!findUser) {
          const new_user = new googleUser({
            id: profile.id,
            Name: profile.displayName,
            email: profile.emails[0].value,
          });
          const saved = await new_user.save();
          console.log("saved:", saved);
          return done(null, saved);
        }
        return done(null, findUser.toObject());
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
