import { z } from "zod";

export const UpadteTripSchema = z.object({
  tripId: z.string(),
  title: z.string().optional(),
  coverImage: z.string().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
});

export type UpdateTripInput = z.infer<typeof UpadteTripSchema>;
