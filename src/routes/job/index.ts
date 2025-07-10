import { Router } from "express";
import * as jobController from "../../controllers/jobController";
import { validate } from "../../middlewares/validate";
import { jobCreateSchema, jobUpdateSchema } from "../../validators/jobValidation";
import { authMiddleware } from "../../middlewares/authMiddleware";

const jobRouter = Router();

jobRouter.use(authMiddleware);

/**
 * @swagger
 * /job/create:
 *   post:
 *     summary: Create a new job application
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/JobCreateInput'
 *     responses:
 *       201:
 *         description: Job created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JobResponse'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */

jobRouter.post("/create", validate(jobCreateSchema), jobController.createJob);

/**
 * @swagger
 * /job:
 *   get:
 *     summary: Get all job applications for the authenticated user
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [DRAFT, APPLIED, INTERVIEW, OFFER, ACCEPTED, REJECTED]
 *         description: Filter by job status
 *       - in: query
 *         name: company
 *         schema:
 *           type: string
 *         description: Filter by company name
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by job title or company
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of results per page
 *     responses:
 *       200:
 *         description: List of jobs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 jobs:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/JobResponse'
 *                 totalCount:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *       401:
 *         description: Unauthorized
 */

jobRouter.get("/", jobController.getJobs);

/**
 * @swagger
 * /job/search:
 *   get:
 *     summary: Get job application statistics for the authenticated user
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Job statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 draft:
 *                   type: integer
 *                 applied:
 *                   type: integer
 *                 interview:
 *                   type: integer
 *                 offer:
 *                   type: integer
 *                 accepted:
 *                   type: integer
 *                 rejected:
 *                   type: integer
 *                 offerRate:
 *                   type: number
 *                 acceptanceRate:
 *                   type: number
 *       401:
 *         description: Unauthorized
 */

jobRouter.get("/search", jobController.getJobStats);

/**
 * @swagger
 * /job/reminders:
 *   get:
 *     summary: Get jobs with upcoming reminders
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: days
 *         schema:
 *           type: integer
 *         description: Number of days ahead to look for reminders,  default is 7
 *     responses:
 *       200:
 *         description: Jobs with reminders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/JobResponse'
 *       401:
 *         description: Unauthorized
 */

jobRouter.get("/reminders", jobController.getUpcomingReminders);

/**
 * @swagger
 * /job/{id}:
 *   get:
 *     summary: Get a single job application by ID
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Job found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JobResponse'
 *       404:
 *         description: Job not found
 *       401:
 *         description: Unauthorized
 */

jobRouter.get("/:id", jobController.getJob);

/**
 * @swagger
 * /job/{id}:
 *   put:
 *     summary: Update a job application
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/JobUpdateInput'
 *     responses:
 *       200:
 *         description: Job updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JobResponse'
 *       404:
 *         description: Job not found
 *       401:
 *         description: Unauthorized
 */

jobRouter.put("/:id", validate(jobUpdateSchema), jobController.updateJob);

/**
 * @swagger
 * /job/{id}:
 *   delete:
 *     summary: Delete (soft delete) a job application
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Job deleted
 *       404:
 *         description: Job not found
 *       401:
 *         description: Unauthorized
 */

jobRouter.delete("/:id", jobController.deleteJob);

export default jobRouter;