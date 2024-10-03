import { response, Router } from "express";
import { validationResult, checkSchema, matchedData } from "express-validator";
import {
  newUserValidations,
  newPasswordValidations,
} from "../validations/user.mjs";
import "../stratigies/Loclay.mjs";
import passport from "passport";
import { User } from "../mongoos/Schema/userSchema.mjs";
import { googleUser } from "../mongoos/Schema/googleUserSchema.mjs";
import { hashPassword } from "../hashing/hashPass.mjs";
import multer from "multer";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "profile photos");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(dirname(dirname(__filename)));

const uploadDir = path.join(__dirname, "profile photos");

const fileFilter = (req, file, cb) => {
  const filetypes = /jpg|jpeg|png/;
  const fileType = filetypes.test(file.mimetype);
  const fileExt = filetypes.test(file.originalname.toLowerCase());
  if (fileType && fileExt) return cb(null, true);
  cb(new Error("Error: not allowd type"), false);
};
if (!fs.existsSync(uploadDir)) {
  fs.mkdir(uploadDir, { recursive: true }, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("created successfuly");
    }
  });
}

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 200000 },
});

router.use(passport.initialize());
router.use(passport.session());

router.post("/log-in", passport.authenticate("local"), (request, response) => {
  request.session.visited = true;
  User.updateOne(
    { _id: request.user._id },
    { sessionid: request.session.id }
  ).catch((err) => {
    console.log(err);
  });
  User.findOne({ _id: request.user._id })
    .then((user) => {
      response.cookie("type", user.userType, { maxAge: 60000 * 60 * 24 });
      response.cookie("id", user._id, { maxAge: 60000 * 60 * 24 });
      return response.status(200).send("done");
    })
    .catch((err) => {
      console.log(err);
      return response.sendStatus(404);
    });
});

router.patch(
  "/update/password",
  checkSchema(newPasswordValidations),
  async (request, response) => {
    if (!request.user) return response.status(401).send("Not logged In");
    const result = validationResult(request);
    console.log(request.user._id);
    if (!result.isEmpty()) return response.status(400).send(result);
    const { newPassword } = matchedData(request);
    console.log(newPassword);
    await User.updateOne(
      { _id: request.user._id },
      { password: newPassword }
    ).catch((err) => {
      console.log(err);
    });
    return response.status(201).send("done");
  }
);

router.get("/status", (request, response) => {
  return request.user
    ? response.status(200).send(request.cookies.type)
    : response.sendStatus(404);
});

router.get("/profile", (request, response) => {
  if (!request.user) return response.status(401).send("Not logged In");
  request.session.visited = true;
  let theUser;
  const user = User.findOne({ sessionid: request.sessionID })
    .then((u) => {
      const user_ = u.toObject();
      delete user_._id;
      delete user_.password;
      delete user_.__v;
      delete user_.sessionid;
      return response.status(200).send(user_);
    })
    .catch((err) => {
      console.log(err);
      return response.sendStatus(400);
    });
});

router.get("/logout", async (request, response, next) => {
  if (!request.user) return response.sendStatus(404);
  const user =
    User.findOne({ _id: request.user._id }) ||
    googleUser.findOne({ _id: request.user._id });
  if (!user) {
    return response.sendStatus(400);
  }
  await User.updateOne({ _id: request.user._id }, { sessionid: "" });
  await googleUser.updateOne({ _id: request.user._id }, { sessionid: "" });

  console.log("session property is deleted");
  request.logout((err) => {
    if (err) return next(err);
  });
  Object.keys(request.cookies).forEach((cookieName) => {
    response.clearCookie(cookieName);
  });
  console.log("cookie is cleared");
  return response.status(200).send("succesfuly logged out");
});

router.get("/main", (request, response) => {
  console.log("in main");
  request.session.visited = true;
  return response.sendStatus(200);
});

router.patch("/update", (request, response) => {
  if (!request.user) return response.status(401).send("Not logged In");
  const data = { ...request.body };
  if (!data) return response.sendStatus(404);
  const find = User.findOneAndUpdate({ sessionid: request.sessionID }, data)
    .then(() => {
      console.log("updated");
    })
    .catch((err) => {
      console.log(err);
    });
  return response.status(200).send("ok");
});

router.get("/users", async (request, response) => {
  if (!request.user) return response.status(401).send("Not logged In");
  User.find({})
    .then((users_) => {
      return response.send(users_);
    })
    .catch((err) => {
      console.log(err);
    });
});
router.get("/test", (request, response) => {
  console.log(request.sessionID);
  if (!request.user) return response.sendStatus(400);
  return response.status(200).send("successfuly reached to test rout");
});
router.post(
  "/sign-in",
  upload.single("image"),
  checkSchema(newUserValidations),
  (req, res, next) => {
    if (req.file) {
      console.log(req.file);
      next();
    } else {
      res.sendStatus(400);
    }
  },
  async (request, response) => {
    request.session.visited = true;
    const result = validationResult(request).array();
    const errors = result.map((error) => {
      return error.msg;
    });
    if (errors.length > 0) {
      return response.status(400).json({ errors });
    }
    const data = matchedData(request);
    data.bio = request.body.bio;
    data.photo = request.file.path;
    console.log(data);
    data.password = hashPassword(data.password);
    const newUser = new User(data);
    try {
      const saved = await newUser.save();
      return response.status(201).send(newUser);
    } catch (err) {
      return response.status(400).send(err.errorResponse.errmsg);
    }
  }
);

router.delete("/delete", async (request, response, next) => {
  console.log(request.sessionID);
  if (!request.sessionID) return response.status(400).send("not loged in");
  await User.deleteOne({ sessionid: request.sessionID })
    .then(() => {
      request.logout((err) => {
        if (err) next(err);
      });
      Object.keys(request.cookies).forEach((cookieName) => {
        response.clearCookie(cookieName);
      });
      console.log(" succesfuly deleted");
      return response.status(200).send("deleted");
    })
    .catch((err) => {
      console.log(err);
      return response.status(402).send(err);
    });
});

router.get(
  "/redirect",
  passport.authenticate("google"),
  (request, response) => {
    response.clearCookie("productid");
    request.session.visited = true;
    googleUser
      .updateOne({ _id: request.user._id }, { sessionid: request.session.id })
      .catch((err) => {
        console.log(err);
      });
    console.log(request.session);
    console.log(request.user);
    // return response.status(200).send("logged in  succesfuly!");
    response.redirect("/main");
  }
);
export default router;

// client id = 100063936134-bo9c0fs6eebpos2bnjaqgpji2l1s1018.apps.googleusercontent.com
// client secret = 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
// http://localhost:3000/redirect
