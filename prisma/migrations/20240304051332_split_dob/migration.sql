/*
  Warnings:

  - You are about to drop the column `date` on the `birthdays` table. All the data in the column will be lost.
  - Added the required column `day` to the `birthdays` table without a default value. This is not possible if the table is not empty.
  - Added the required column `month` to the `birthdays` table without a default value. This is not possible if the table is not empty.
  - Made the column `firstName` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastName` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "birthdays" DROP COLUMN "date",
ADD COLUMN     "day" TEXT NOT NULL,
ADD COLUMN     "month" TEXT NOT NULL,
ADD COLUMN     "year" TEXT;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "firstName" SET NOT NULL,
ALTER COLUMN "lastName" SET NOT NULL;
