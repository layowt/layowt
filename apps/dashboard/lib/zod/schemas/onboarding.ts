import { z, ZodType } from "zod";

interface OnboardingSchema {
  id: string;
  firstName: string;
  lastName: string;
  displayName: string;
  paymentPlan: string;
}

export const onboardingSchema: ZodType<OnboardingSchema> = z.object({
  id:
    z.string()
    .default(''),
  firstName: 
    z.string()
    .min(1, 'First name cannot be empty')
    .max(50, 'First name cannot be longer than 50 characters'),
  lastName: 
    z.string()
    .min(1, 'Last name cannot be empty')
    .max(50, 'Last name cannot be longer than 50 characters'),
  displayName: 
    z.string()
    .min(1, 'Display name cannot be empty')
    .max(50, 'Display name cannot be longer than 50 characters'),
  paymentPlan: 
    z.string()
    .optional()
}) as ZodType<OnboardingSchema>;