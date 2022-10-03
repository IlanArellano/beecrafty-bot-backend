require("dotenv").config();
import express from "express";
import * as redis from "redis";
import cors from "cors";
import {
  statusRouter,
  onlineRouter,
  testRouter,
  ExecuteRouter,
  registerRouter,
  unlinkRouter,
} from "./commands";
import { Headers, RedisRequestLimiter, ErrorHandler } from "./middlewares";
import { ENDPOINT, CONSOLE_COLORS } from "./types";
import {
  getSuccessFulRedisInformation,
  getWarningRedisInformation,
} from "./constants";
import morgan from "morgan";
import requestIP from "request-ip";

//Declarations
const app = express();
const RedisClient = redis.createClient();

//Redis initialization
RedisClient.connect()
  .then(getSuccessFulRedisInformation)
  .catch(getWarningRedisInformation);

app.set("port", process.env.PORT || 4000);

//MiddleWares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(requestIP.mw());

//Custom MiddleWares
app.use(Headers());
// @ts-ignore: Unreachable code error
app.use(RedisRequestLimiter(RedisClient));

//Command Routes
app.use(ENDPOINT.status, statusRouter);
app.use(ENDPOINT.online, onlineRouter);
app.use(ENDPOINT.test, testRouter);
app.use(ENDPOINT.register, registerRouter);
app.use(ENDPOINT.execute, ExecuteRouter);
app.use(ENDPOINT.unlink, unlinkRouter);

console.log({ routes: app._router.stack });

//Error Handler
// @ts-ignore: Unreachable code error
app.use(ErrorHandler(RedisClient));

app.listen(app.get("port"), () => {
  console.log(
    CONSOLE_COLORS.FgGreen,
    `Server on port ${app.get("port")}`,
    CONSOLE_COLORS.FgWhite
  );
});
