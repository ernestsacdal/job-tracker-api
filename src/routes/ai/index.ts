import { Router } from "express";
import * as aiController from "../../controllers/aiController";
import { authMiddleware } from "../../middlewares/authMiddleware";

const aiRouter = Router();

aiRouter.use(authMiddleware);

aiRouter.post("/letter/:jobId", aiController.generateCoverLetter);

export default aiRouter;