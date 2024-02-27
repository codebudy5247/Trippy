import { z } from "zod";

export const TripSchema = z.object({
  title: z.string(),
  coverImage: z.string(),
  ownerId:z.string(),
  startDate:z.date(),
  endDate:z.date()
});

export type CreateTripInput = z.infer<typeof TripSchema>;
