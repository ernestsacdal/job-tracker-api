import express from "express";
import authRouter from "./auth/index";
import jobRouter from "./job/index";
import aiRouter from "./ai/index";

const routes = express.Router();

routes.use("/auth", authRouter);

routes.use("/job", jobRouter)

routes.use("/ai", aiRouter);



export default routes;
