-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "images" TEXT[],
    "rate" INTEGER[],

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Book_log" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_completed" BOOLEAN NOT NULL DEFAULT false,
    "user_id" INTEGER,
    "bookId" INTEGER,

    CONSTRAINT "Book_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chapter" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "chapter_log_id" INTEGER,

    CONSTRAINT "Chapter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chapter_log" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_completed" BOOLEAN NOT NULL DEFAULT false,
    "user_id" INTEGER,
    "book_log_id" INTEGER,

    CONSTRAINT "Chapter_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BookToChapter" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BookToChapter_AB_unique" ON "_BookToChapter"("A", "B");

-- CreateIndex
CREATE INDEX "_BookToChapter_B_index" ON "_BookToChapter"("B");

-- AddForeignKey
ALTER TABLE "Book_log" ADD CONSTRAINT "Book_log_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book_log" ADD CONSTRAINT "Book_log_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_chapter_log_id_fkey" FOREIGN KEY ("chapter_log_id") REFERENCES "Chapter_log"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chapter_log" ADD CONSTRAINT "Chapter_log_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chapter_log" ADD CONSTRAINT "Chapter_log_book_log_id_fkey" FOREIGN KEY ("book_log_id") REFERENCES "Book_log"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToChapter" ADD CONSTRAINT "_BookToChapter_A_fkey" FOREIGN KEY ("A") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToChapter" ADD CONSTRAINT "_BookToChapter_B_fkey" FOREIGN KEY ("B") REFERENCES "Chapter"("id") ON DELETE CASCADE ON UPDATE CASCADE;
