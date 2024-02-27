import { db } from "@/lib/db";

// Get user by EmailID
export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });
    return user;
  } catch (error) {
    return null;
  }
};

// Get user trips
export const getUserTrips = async (userId: string) => {
  try {
    const trips = await db.trip.findMany({
      where: {
        ownerId: userId,
      },
    });
    return trips;
  } catch (error) {
    return null;
  }
};
