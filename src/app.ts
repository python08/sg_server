import express from "express";
import cookieParser from "cookie-parser";
import connect from "./utils/connect";
import logger from "./utils/logger";
import routes from "./routes";
import { deserializeUser } from "./middleware/de-serialize-user";
import dotenv from "dotenv";

const app = express();
const cors = require("cors");

// Load environment variables based on NODE_ENV
const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";
dotenv.config({ path: envFile });

const port = process.env.PORT || 1337;

app.use(cookieParser());

// for body parser
app.use(express.json());

console.log("origin: ",  process.env.ORIGIN.split(", "))
app.use(
  cors({
    origin: process.env.ORIGIN.split(", "),
    credentials: true,
  })
);

app.use(deserializeUser); // executes on all req

console.log("Running in", process.env.NODE_ENV, "mode");
console.log("BUILD_VERSION: ", process.env.BUILD_VERSION);

app.listen(port, async () => {
  logger.info(`app running at http://localhost:${port}`);
  await connect();

  routes(app);
});
