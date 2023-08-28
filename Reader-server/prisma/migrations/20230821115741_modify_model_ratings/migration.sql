/*
  Warnings:

  - You are about to drop the column `bookId` on the `Ratings` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Ratings` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `Ratings` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `book_id` to the `Ratings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Ratings` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Ratings" DROP CONSTRAINT "Ratings_bookId_fkey";

-- DropForeignKey
ALTER TABLE "Ratings" DROP CONSTRAINT "Ratings_userId_fkey";

-- AlterTable
ALTER TABLE "Ratings" DROP COLUMN "bookId",
DROP COLUMN "userId",
ADD COLUMN     "book_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Ratings_user_id_key" ON "Ratings"("user_id");

-- AddForeignKey
ALTER TABLE "Ratings" ADD CONSTRAINT "Ratings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ratings" ADD CONSTRAINT "Ratings_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
