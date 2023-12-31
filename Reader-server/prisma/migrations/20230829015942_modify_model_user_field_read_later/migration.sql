/*
  Warnings:

  - You are about to drop the `_BookToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BookToUser" DROP CONSTRAINT "_BookToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_BookToUser" DROP CONSTRAINT "_BookToUser_B_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bookId" INTEGER,
ADD COLUMN     "readLater" INTEGER[];

-- DropTable
DROP TABLE "_BookToUser";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE SET NULL ON UPDATE CASCADE;
