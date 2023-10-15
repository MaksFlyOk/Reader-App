/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `Book_log` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[bookId]` on the table `Book_log` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Book_log_user_id_key" ON "Book_log"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Book_log_bookId_key" ON "Book_log"("bookId");
