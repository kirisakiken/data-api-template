import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StudentService {
  @Inject()
  private prismaService!: PrismaService

  public listStudents() {
    return this.prismaService.student.findMany()
  }

  public getStudentByNo(studentNo: number) {
    return this.prismaService.student.findUnique({
      where: {
        student_no: studentNo,
      },
      rejectOnNotFound: true,
      select: { // select specified columns only
        student_no: true,
        first_name: true,
        last_name: true,
        student_type: true,
        entry_year: true,
      },
    })
  }
}
