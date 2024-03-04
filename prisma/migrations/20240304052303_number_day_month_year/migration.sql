/*
  Warnings:

  - The `year` column on the `birthdays` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `day` on the `birthdays` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `month` on the `birthdays` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "birthdays" DROP COLUMN "day",
ADD COLUMN     "day" INTEGER NOT NULL,
DROP COLUMN "month",
ADD COLUMN     "month" INTEGER NOT NULL,
DROP COLUMN "year",
ADD COLUMN     "year" INTEGER;
