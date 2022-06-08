import { Controller, Get, Inject, Param, ParseEnumPipe, ParseIntPipe, UseGuards } from '@nestjs/common'
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

  @Get('/by-student-no/:student_no')
  getStudentByNo(@Param('student_no', ParseIntPipe) studentNo: number) {
    return this.studentService.getStudentByNo(studentNo)
  }

  @Get('/by-student-type/:student_type')
  getStudentsByType(@Param('student_type') studentType: StudentType) {
    return this.studentService.getStudentsByType(studentType)
  }

  @Get('/by-entry-year/:entry_year')
  getStudentsByEntryYear(@Param('entry_year', ParseIntPipe) entryYear: number) {
    return this.studentService.getStudentsByEntryYear(entryYear)
  }
}
