/*
  Warnings:

  - You are about to drop the column `quality` on the `VideoLinksArray` table. All the data in the column will be lost.
  - The `links` column on the `VideoLinksArray` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "VideoLinksArray" DROP COLUMN "quality",
DROP COLUMN "links",
ADD COLUMN     "links" JSONB;
