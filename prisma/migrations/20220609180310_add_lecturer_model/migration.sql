-- CreateEnum
CREATE TYPE "LecturerType" AS ENUM ('assistant_professor', 'associate_professor', 'full_professor', 'distinguished_professor');

-- CreateTable
CREATE TABLE "lecturers" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lecturer_no" INTEGER NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "lecturer_type" "LecturerType" NOT NULL,
    "entry_year" INTEGER NOT NULL,
    "salary" INTEGER NOT NULL,

    CONSTRAINT "lecturers_pkey" PRIMARY KEY ("lecturer_no")
);

-- CreateIndex
CREATE UNIQUE INDEX "lecturers_lecturer_no_key" ON "lecturers"("lecturer_no");
