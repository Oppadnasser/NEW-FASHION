import express, { request, response } from "express";
import userRouter from "./routes/userRoutes.mjs";
import cookieParser, { signedCookie, signedCookies } from "cookie-parser";
import Prouter from "./routes/ProductRoutes.mjs";
import session from "express-session";
import mongoose from "mongoose";
import cors from "cors";
import MongoStore from "connect-mongo";
const PORT = process.env.PORT || 3000;
const app = express();
app.use(
  session({
    secret: "oppad$$%^&",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60 * 24,
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    },
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost/express_tutorial",
      client: mongoose.connection.getClient(),
    }),
  })
);

mongoose
  .connect("mongodb://localhost/express_tutorial", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(`error is ${err}`);
  });
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser("oppad$$%^&"));

app.use(userRouter);
app.use(Prouter);
app.use("/uploads", express.static("uploads"));
app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}`);
});
