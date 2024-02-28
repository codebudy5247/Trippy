"use server";

import { db } from "@/lib/db";
import { handleError } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { UpdateTripInput } from "./schema";

export async function updateTrip(data: UpdateTripInput, tripId: string) {
  if (!tripId) {
    return {
      error: "Trip Not found!",
    };
  }
  let updatedTrip;
  try {
    updatedTrip = await db.trip.update({
      where: {
        id: tripId,
      },
      data: data,
    });
  } catch (error) {
    handleError(error);
  }
  revalidatePath(`/trip/${updatedTrip?.id}`);
  return { data: updatedTrip };
}
