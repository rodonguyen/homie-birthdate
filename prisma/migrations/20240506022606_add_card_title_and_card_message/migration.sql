/*
  Warnings:

  - You are about to drop the column `message` on the `birthdays` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "birthdays" DROP COLUMN "message",
ADD COLUMN     "cardMessage" TEXT,
ADD COLUMN     "cardTitle" TEXT;
