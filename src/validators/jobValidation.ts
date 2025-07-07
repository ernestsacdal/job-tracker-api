import { JobStatus } from '@prisma/client';
import { z } from 'zod';

const jobStatusEnum = z.enum(["APPLIED", "INTERVIEW", "OFFER", "REJECTED", "DRAFT"],
    {
        errorMap: () => ({
            message: "Invalid job status provided. Please use one of the following: APPLIED, INTERVIEW, OFFER, REJECTED, DRAFT."
        })
    }
);

export const jobCreateSchema = z.object({
    jobTitle: z.string().min(1, { message: "Job title is required." }).max(100),
    company: z.string().min(1, { message: "Company name is required." }).max(100),
    link: z.string().url({ message: "Invalid URL format." }).optional().or(z.literal("")),
    status: jobStatusEnum,
    notes: z.string().max(1000).optional(),
    jobDesc: z.string().max(1000).optional(),
    dateApplied: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date format. Please use a valid date string."
    }),
    reminderDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid reminder date format. Please use a valid date string."
    }).optional(),
});

export const jobUpdateSchema = z.object({
    jobTitle: z.string().min(1, { message: "Job title is required" }).max(200, { message: "Job title must be less than 200 characters" }).optional(),
    company: z.string().min(1, { message: "Company name is required" }).max(100, { message: "Company name must be less than 100 characters" }).optional(),
    link: z.string().url({ message: "Please provide a valid URL" }).optional().or(z.literal("")),
    status: jobStatusEnum.optional(),
    notes: z.string().max(1000, { message: "Notes must be less than 1000 characters" }).optional(),
    jobDesc: z.string().max(5000, { message: "Job description must be less than 5000 characters" }).optional(),
    dateApplied: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Please provide a valid date",
    }).optional(),
    reminderDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Please provide a valid reminder date",
    }).optional(),
});

export type JobCreateInput = z.infer<typeof jobCreateSchema>
export type JobUpdateInput = z.infer<typeof jobUpdateSchema>


