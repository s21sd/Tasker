/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Tasks` table. All the data in the column will be lost.
  - Added the required column `reminder` to the `Tasks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tasks" DROP COLUMN "updatedAt",
ADD COLUMN     "reminder" TIMESTAMP(3) NOT NULL;
