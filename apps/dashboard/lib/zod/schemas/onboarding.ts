import { z } from "zod";

const experienceLevelEnum = z.enum([
  "businessOwner",
  "developer",
  "designer",
  "marketer",
  "student",
  "other"
]);

export const onboardingSchema = z.object({
  id: z.string().default(''),
  firstName: z.string()
    .min(1, 'First name cannot be empty')
    .max(50, 'First name cannot be longer than 50 characters'),
  lastName: z.string()
    .min(1, 'Last name cannot be empty')
    .max(50, 'Last name cannot be longer than 50 characters'),
  displayName: z.string()
    .min(1, 'Display name cannot be empty')
    .max(50, 'Display name cannot be longer than 50 characters'),
  paymentPlan: z.string().optional(),
  experienceLevel: experienceLevelEnum.optional(),
});

export type OnboardingSchema = z.infer<typeof onboardingSchema>;