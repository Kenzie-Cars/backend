import "express-async-errors";
import "reflect-metadata";
import express, { Application } from "express";
import handleError from "./errors";
import advertisementsRouter from "./routes/advertisement.routes";
import { userRoutes } from "./routes/user.routes";
import { sessionRoute } from "./routes/session.routes";


export const app: Application = express();
app.use(express.json())
app.use("/advertisements", advertisementsRouter);
app.use("/users", userRoutes);
app.use("/login", sessionRoute);
app.use(handleError)