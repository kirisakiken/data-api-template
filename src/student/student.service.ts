import { Inject, Injectable } from '@nestjs/common'
import { StudentType } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import { studentSelectOptions } from './dto'

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
      select: studentSelectOptions,
    })
  }

  public getStudentsByType(studentType: StudentType) {
    return this.prismaService.student.findMany({
      where: {
        student_type: studentType,
      },
      select: studentSelectOptions,
    })
  }

  public getStudentsByEntryYear(entryYear: number) {
    return this.prismaService.student.findMany({
      where: {
        entry_year: entryYear,
      },
      select: studentSelectOptions,
    })
  }
}
