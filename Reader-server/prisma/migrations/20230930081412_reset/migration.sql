-- DropForeignKey
ALTER TABLE "Ratings" DROP CONSTRAINT "Ratings_book_id_fkey";

-- DropForeignKey
ALTER TABLE "Ratings" DROP CONSTRAINT "Ratings_user_id_fkey";

-- AlterTable
ALTER TABLE "Ratings" ALTER COLUMN "user_id" SET DEFAULT 0;

-- AddForeignKey
ALTER TABLE "Ratings" ADD CONSTRAINT "Ratings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ratings" ADD CONSTRAINT "Ratings_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;
