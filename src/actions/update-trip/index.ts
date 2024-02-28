"use server";

import { db } from "@/lib/db";
import { handleError } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { UpdateTripInput } from "./schema";

export async function updateTrip(data: UpdateTripInput) {
  if (!data.tripId) {
    return {
      error: "Trip Not found!",
    };
  }
  let updatedTrip;
  try {
    updatedTrip = await db.trip.update({
      where: {
        id: data.tripId,
      },
      data: {
        title: data.title,
        coverImage: data.coverImage,
        startDate: data.startDate,
        endDate: data.endDate,
      },
    });
  } catch (error) {
    console.log(error);
    handleError(error);
  }
  revalidatePath(`/trip/${updatedTrip?.id}`);
  return { data: updatedTrip };
}
