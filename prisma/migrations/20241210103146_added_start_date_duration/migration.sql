/*
  Warnings:

  - Added the required column `duration` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "duration" INTEGER NOT NULL,
ADD COLUMN     "startDate" TEXT NOT NULL;