import express from "express";
import authRouter from "./auth/index";
import jobRouter from "./job/index";

const routes = express.Router();

routes.use("/auth", authRouter);

routes.use("/job", jobRouter)

export default routes;
