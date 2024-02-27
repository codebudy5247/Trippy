/*
  Warnings:

  - You are about to drop the column `userId` on the `trips` table. All the data in the column will be lost.
  - Added the required column `ownerId` to the `trips` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "trips" DROP CONSTRAINT "trips_userId_fkey";

-- AlterTable
ALTER TABLE "trips" DROP COLUMN "userId",
ADD COLUMN     "ownerId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "trips" ADD CONSTRAINT "trips_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
