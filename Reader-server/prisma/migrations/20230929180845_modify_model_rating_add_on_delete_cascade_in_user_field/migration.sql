-- DropForeignKey
ALTER TABLE "Ratings" DROP CONSTRAINT "Ratings_user_id_fkey";

-- AddForeignKey
ALTER TABLE "Ratings" ADD CONSTRAINT "Ratings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
