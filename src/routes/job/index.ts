import { Router } from "express";
import * as jobController from "../../controllers/jobController";
import { validate } from "../../middlewares/validate";
import { jobCreateSchema, jobUpdateSchema } from "../../validators/jobValidation";
import { authMiddleware } from "../../middlewares/authMiddleware";

const jobRouter = Router();

jobRouter.use(authMiddleware);

jobRouter.post("/create", validate(jobCreateSchema), jobController.createJob);

jobRouter.get("/", jobController.getJobs);

jobRouter.get("/:id", jobController.getJob);

jobRouter.put("/:id", validate(jobUpdateSchema), jobController.updateJob);

jobRouter.delete("/:id", jobController.deleteJob);

jobRouter.get("/search", jobController.getJobStats);

export default jobRouter;