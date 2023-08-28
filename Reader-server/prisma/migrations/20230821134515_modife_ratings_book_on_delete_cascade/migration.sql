-- DropForeignKey
ALTER TABLE "Ratings" DROP CONSTRAINT "Ratings_book_id_fkey";

-- AddForeignKey
ALTER TABLE "Ratings" ADD CONSTRAINT "Ratings_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;
