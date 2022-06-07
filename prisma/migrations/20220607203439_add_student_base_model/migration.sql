-- CreateEnum
CREATE TYPE "StudentType" AS ENUM ('unknown', 'associate', 'bachelors', 'masters', 'doctoral');

-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "student_no" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "student_type" "StudentType" NOT NULL,
    "entry_year" INTEGER NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("student_no")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_student_no_key" ON "Student"("student_no");
