-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "category" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "pages" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "pulishDate" TEXT NOT NULL DEFAULT '';