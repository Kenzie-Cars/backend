import "express-async-errors";
import "reflect-metadata";
import express, { Application } from "express";
import handleError from "./errors";
import advertisementsRouter from "./routes/advertisement.routes";


export const app: Application = express();
app.use(express.json())
app.use("/advertisements", advertisementsRouter);
app.use(handleError)