import cors from "cors";
import express, { Application } from "express";
import "express-async-errors";
import "reflect-metadata";
import handleError from "./errors";
import advertisementsRouter from "./routes/advertisement.routes";
import { sessionRoute } from "./routes/session.routes";
import { userRoutes } from "./routes/user.routes";


export const app: Application = express();
app.use(express.json())
app.use(cors())
app.use("/advertisements", advertisementsRouter);
app.use("/users", userRoutes);
app.use("/login", sessionRoute);
app.use(handleError)