/*
  Warnings:

  - The primary key for the `students` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `student_no` on the `students` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "students" DROP CONSTRAINT "students_pkey",
DROP COLUMN "student_no",
ADD COLUMN     "student_no" INTEGER NOT NULL,
ADD CONSTRAINT "students_pkey" PRIMARY KEY ("student_no");

-- CreateIndex
CREATE UNIQUE INDEX "students_student_no_key" ON "students"("student_no");
