import { Controller, Get, Inject, Param, Post, UseGuards } from '@nestjs/common'
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
}
