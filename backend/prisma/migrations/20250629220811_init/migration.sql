/*
  Warnings:

  - The primary key for the `Activity` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `handle` on the `Activity` table. All the data in the column will be lost.
  - The `id` column on the `Activity` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `profileId` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_pkey",
DROP COLUMN "handle",
ADD COLUMN     "profileId" INTEGER NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Activity_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "handle" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_handle_key" ON "Profile"("handle");

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
