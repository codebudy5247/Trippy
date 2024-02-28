import { z } from "zod";

export const UpadteTripSchema = z.object({
  title:z.string(),
  coverImage:z.string(),
  startDate:z.date(),
  endDate:z.date(),
});

export type UpdateTripInput = z.infer<typeof UpadteTripSchema>;
