import express from "express";
import { createConnection } from "typeorm";
import * as bodyParser from "body-parser";
import cors from "cors";
import userRouter from "./routes/user";
import logger from "morgan";

const PORT = 3001;
const app = express();

createConnection()
  .then(async () => {
    app.use(logger("dev"));
    app.use(bodyParser.json());
    app.use(
      cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
      })
    );

    app.get("/", (req, res) => {
      res.send("hello");
    });

    app.use("/user", userRouter);

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
