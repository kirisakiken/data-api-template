import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { StudentType } from '@prisma/client';
import { JwtGuard } from '../auth/guard';
import { CreateStudentDto, UpdateStudentDto } from './dto';
import { StudentService } from './student.service';

@UseGuards(JwtGuard)
@Controller('student')
export class StudentController {
  @Inject()
  private studentService!: StudentService;

  @Get()
  listStudents() {
    return this.studentService.listStudents();
  }

  @Get('/by-student-no/:student_no')
  getStudentByNo(@Param('student_no', ParseIntPipe) studentNo: number) {
    return this.studentService.getStudentByNo(studentNo);
  }

  @Get('/by-student-type/:student_type')
  getStudentsByType(@Param('student_type') studentType: StudentType) {
    return this.studentService.getStudentsByType(studentType);
  }

  @Get('/by-entry-year/:entry_year')
  getStudentsByEntryYear(@Param('entry_year', ParseIntPipe) entryYear: number) {
    return this.studentService.getStudentsByEntryYear(entryYear);
  }

  @Post('/create')
  createStudent(@Body() dto: CreateStudentDto) {
    return this.studentService.createStudent(dto);
  }

  @Patch('/update')
  updateStudent(@Body() dto: UpdateStudentDto) {
    return this.studentService.updateStudent(dto);
  }

  @Delete('/delete/by-student-no/:student_no')
  deleteStudentByStudentNo(
    @Param('student_no', ParseIntPipe) studentNo: number,
  ) {
    return this.studentService.deleteStudentByStudentNo(studentNo);
  }
}
