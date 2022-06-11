-- CreateTable
CREATE TABLE "exams" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "exam_no" TEXT NOT NULL,
    "exam_name" TEXT NOT NULL,
    "year" INTEGER NOT NULL,

    CONSTRAINT "exams_pkey" PRIMARY KEY ("exam_no")
);

-- CreateIndex
CREATE UNIQUE INDEX "exams_exam_no_key" ON "exams"("exam_no");
