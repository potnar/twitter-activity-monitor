-- CreateEnum
CREATE TYPE "ActivityType" AS ENUM ('TWEET', 'RETWEET', 'REPLY');

-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL,
    "handle" TEXT NOT NULL,
    "type" "ActivityType" NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);
