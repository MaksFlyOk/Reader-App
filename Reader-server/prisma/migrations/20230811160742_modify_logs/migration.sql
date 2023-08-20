/*
  Warnings:

  - You are about to drop the column `chapter_log_id` on the `Chapter` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Chapter_log` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Chapter" DROP CONSTRAINT "Chapter_chapter_log_id_fkey";

-- DropForeignKey
ALTER TABLE "Chapter_log" DROP CONSTRAINT "Chapter_log_user_id_fkey";

-- AlterTable
ALTER TABLE "Chapter" DROP COLUMN "chapter_log_id";

-- AlterTable
ALTER TABLE "Chapter_log" DROP COLUMN "user_id",
ADD COLUMN     "chapter_id" INTEGER,
ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "Chapter_log" ADD CONSTRAINT "Chapter_log_chapter_id_fkey" FOREIGN KEY ("chapter_id") REFERENCES "Chapter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chapter_log" ADD CONSTRAINT "Chapter_log_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
