/*
  Warnings:

  - You are about to drop the column `pulishDate` on the `Book` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "pulishDate",
ADD COLUMN     "publishDate" TEXT NOT NULL DEFAULT '';
