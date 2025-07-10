import { Router } from "express";
import * as aiController from "../../controllers/aiController";
import { authMiddleware } from "../../middlewares/authMiddleware";

const aiRouter = Router();

aiRouter.use(authMiddleware);

/**
 * @swagger
 * /ai/letter/{jobId}:
 *   post:
 *     summary: Generate and save an AI-powered cover letter for a job
 *     tags: [AI]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               extraInfo:
 *                 type: string
 *                 description: Additional info to personalize the cover letter
 *     responses:
 *       200:
 *         description: Cover letter generated and saved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 jobAppId:
 *                   type: integer
 *                 content:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       401:
 *         description: Unauthorized
 */

aiRouter.post("/letter/:jobId", aiController.generateCoverLetter);

/**
 * @swagger
 * /ai/resume/{jobId}:
 *   post:
 *     summary: Generate and save an AI-powered resume blurb for a job
 *     tags: [AI]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               extraInfo:
 *                 type: string
 *                 description: Additional info to personalize the resume blurb
 *     responses:
 *       200:
 *         description: Resume blurb generated and saved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 jobAppId:
 *                   type: integer
 *                 content:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       401:
 *         description: Unauthorized
 */

aiRouter.post("/resume/:jobId", aiController.generateResumeBlurb);

export default aiRouter;