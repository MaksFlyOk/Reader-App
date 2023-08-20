/*
  Warnings:

  - You are about to drop the `_BookToChapter` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BookToChapter" DROP CONSTRAINT "_BookToChapter_A_fkey";

-- DropForeignKey
ALTER TABLE "_BookToChapter" DROP CONSTRAINT "_BookToChapter_B_fkey";

-- AlterTable
ALTER TABLE "Chapter" ADD COLUMN     "book_id" INTEGER;

-- DropTable
DROP TABLE "_BookToChapter";

-- AddForeignKey
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "Book"("id") ON DELETE SET NULL ON UPDATE CASCADE;
