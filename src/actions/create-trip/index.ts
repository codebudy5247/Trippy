"use server";

import { db } from "@/lib/db";
import { CreateTripInput } from "./schema";
import { handleError } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function createTrip(data: CreateTripInput) {
  const { title, coverImage, ownerId, startDate, endDate } = data;
  if (!ownerId) {
    return {
      error: "Unauthorized",
    };
  }
  let newTrip;
  try {
    newTrip = await db.trip.create({
      data: {
        title,
        coverImage,
        ownerId,
        startDate,
        endDate,
      },
    });
  } catch (error) {
    handleError(error);
  }
  revalidatePath(`/trip/${newTrip?.id}`);
  return { data: newTrip }
}