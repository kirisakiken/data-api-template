/*
  Warnings:

  - You are about to drop the `classes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "classes" DROP CONSTRAINT "classes_lecturer_reference_fkey";

-- DropTable
DROP TABLE "classes";

-- CreateTable
CREATE TABLE "lectures" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lecture_no" TEXT NOT NULL,
    "lecturer_reference" INTEGER,

    CONSTRAINT "lectures_pkey" PRIMARY KEY ("lecture_no")
);

-- CreateIndex
CREATE UNIQUE INDEX "lectures_lecture_no_key" ON "lectures"("lecture_no");

-- AddForeignKey
ALTER TABLE "lectures" ADD CONSTRAINT "lectures_lecturer_reference_fkey" FOREIGN KEY ("lecturer_reference") REFERENCES "lecturers"("lecturer_no") ON DELETE SET NULL ON UPDATE CASCADE;
