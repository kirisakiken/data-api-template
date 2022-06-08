import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { StudentType } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import { CreateStudentDto, studentSelectOptions } from './dto'

@Injectable()
export class StudentService {
  @Inject()
  private prismaService!: PrismaService

  public listStudents() {
    return this.prismaService.student.findMany({
      select: studentSelectOptions,
    })
  }

  public async getStudentByNo(studentNo: number) {
    const student = await this.prismaService.student.findUnique({
      where: {
        student_no: studentNo,
      },
      select: studentSelectOptions,
    })

    if (!student) {
      throw new NotFoundException(`Unable to find student by no: ${studentNo}`)
    }

    return student
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

  public async createStudent(dto: CreateStudentDto) {
    const student = await this.prismaService.student.findUnique({
      where: {
        student_no: dto.studentNo,
      },
    })

    if (student) {
      throw new ConflictException(`Student with no: ${dto.studentNo} already exists`)
    }

    return this.prismaService.student.create({
      data: {
        student_no: dto.studentNo,
        first_name: dto.firstName,
        last_name: dto.lastName,
        student_type: dto.studentType,
        entry_year: dto.entryYear,
      },
      select: studentSelectOptions,
    })
  }
}
