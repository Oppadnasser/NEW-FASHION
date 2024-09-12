import { Strategy } from "passport-local";
import passport from "passport";
import { User } from "../mongoos/Schema/userSchema.mjs";
import { checkPassword } from "../hashing/hashPass.mjs";
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  if (!id) done(null, false);
  const user = await User.findOne({ _id: id });
  if (!user) done(null, false);
  done(null, id);
});

passport.use(
  new Strategy({ usernameField: "email" }, async (email, password, done) => {
    console.log("in strategy", password);
    try {
      const user = await User.findOne({ email: email });
      if (!user) throw new Error("username is incorrect!");
      if (!(await checkPassword(password, user.password)))
        throw new Error("password is incorrect!");
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  })
);

export default passport;
