-- CreateTable
CREATE TABLE "classes" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "class_no" TEXT NOT NULL,
    "lecturer_reference" INTEGER,

    CONSTRAINT "classes_pkey" PRIMARY KEY ("class_no")
);

-- CreateIndex
CREATE UNIQUE INDEX "classes_class_no_key" ON "classes"("class_no");

-- AddForeignKey
ALTER TABLE "classes" ADD CONSTRAINT "classes_lecturer_reference_fkey" FOREIGN KEY ("lecturer_reference") REFERENCES "lecturers"("lecturer_no") ON DELETE SET NULL ON UPDATE CASCADE;
