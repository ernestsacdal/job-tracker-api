/**
 * @swagger
 * components:
 *   schemas:
 *     JobCreateInput:
 *       type: object
 *       required:
 *         - jobTitle
 *         - company
 *         - status
 *         - dateApplied
 *       properties:
 *         jobTitle:
 *           type: string
 *         company:
 *           type: string
 *         link:
 *           type: string
 *           format: uri
 *           nullable: true
 *         status:
 *           type: string
 *           enum: [DRAFT, APPLIED, INTERVIEW, OFFER, ACCEPTED, REJECTED]
 *         notes:
 *           type: string
 *           nullable: true
 *         jobDesc:
 *           type: string
 *           nullable: true
 *         dateApplied:
 *           type: string
 *           format: date-time
 *         reminderDate:
 *           type: string
 *           format: date-time
 *           nullable: true
 *     JobUpdateInput:
 *       type: object
 *       properties:
 *         jobTitle:
 *           type: string
 *         company:
 *           type: string
 *         link:
 *           type: string
 *           format: uri
 *           nullable: true
 *         status:
 *           type: string
 *           enum: [DRAFT, APPLIED, INTERVIEW, OFFER, ACCEPTED, REJECTED]
 *         notes:
 *           type: string
 *           nullable: true
 *         jobDesc:
 *           type: string
 *           nullable: true
 *         dateApplied:
 *           type: string
 *           format: date-time
 *         reminderDate:
 *           type: string
 *           format: date-time
 *           nullable: true
 *     JobResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         userId:
 *           type: integer
 *         jobTitle:
 *           type: string
 *         company:
 *           type: string
 *         link:
 *           type: string
 *           format: uri
 *           nullable: true
 *         status:
 *           type: string
 *         notes:
 *           type: string
 *           nullable: true
 *         jobDesc:
 *           type: string
 *           nullable: true
 *         dateApplied:
 *           type: string
 *           format: date-time
 *         reminderDate:
 *           type: string
 *           format: date-time
 *           nullable: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           nullable: true
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           nullable: true
 *         blurbs:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ResumeBlurb'
 *         coverLetters:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CoverLetter'
 *     ResumeBlurb:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         jobAppId:
 *           type: integer
 *         content:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *     CoverLetter:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         jobAppId:
 *           type: integer
 *         content:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *     LoginInput:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 *     RegisterInput:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - confirmPassword
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 *         confirmPassword:
 *           type: string
 *           format: password
 */
