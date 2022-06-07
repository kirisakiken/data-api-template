/*
  Warnings:

  - You are about to drop the `Student` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Student";

-- CreateTable
CREATE TABLE "students" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "student_no" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "student_type" "StudentType" NOT NULL,
    "entry_year" INTEGER NOT NULL,

    CONSTRAINT "students_pkey" PRIMARY KEY ("student_no")
);

-- CreateIndex
CREATE UNIQUE INDEX "students_student_no_key" ON "students"("student_no");
