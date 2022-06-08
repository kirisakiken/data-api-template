import { Controller, Get, Inject, Param, Post, UseGuards } from '@nestjs/common'
import { StudentType } from '@prisma/client'
import { JwtGuard } from '../auth/guard'
import { StudentService } from './student.service'

@UseGuards(JwtGuard)
@Controller('student')
export class StudentController {
  @Inject()
  private studentService!: StudentService

  @Get()
  listStudents() {
    return this.studentService.listStudents()
  }

  @Get(':student_no')
  getStudentByNo(@Param('student_no') studentNo: number) {
    return this.studentService.getStudentByNo(studentNo)
  }

  @Get(':student_type')
  getStudentsByType(@Param('student_type') studentType: StudentType) {
    return this.studentService.getStudentsByType(studentType)
  }

  @Get(':entry_year')
  getStudentsByEntryYear(@Param('entry_year') entryYear: number) {
    return this.studentService.getStudentsByEntryYear(entryYear)
  }
}
