import { Controller, Get, Inject, Param, ParseIntPipe, UseGuards } from '@nestjs/common'
import { LecturerType } from '@prisma/client';
import { JwtGuard } from '../auth/guard';
import { LecturerService } from './lecturer.service';

@UseGuards(JwtGuard)
@Controller('lecturer')
export class LecturerController {
  @Inject()
  private lecturerService!: LecturerService

  @Get()
  listLecturers() {
    return this.lecturerService.listLecturers()
  }

  @Get('/by-lecturer-no/:lecturer_no')
  getLecturerByNo(@Param('lecturer_no', ParseIntPipe) lecturerNo: number) {
    return this.lecturerService.getLecturerByNo(lecturerNo)
  }

  @Get('/by-lecturer-type/:lecturer_type')
  getLecturersByType(@Param('lecturer_type') lecturerType: LecturerType) {
    return this.lecturerService.getLecturersByType(lecturerType)
  }

  @Get('/by-entry-year/:entry_year')
  getLecturersByEntryYear(@Param('entry_year', ParseIntPipe) entryYear: number) {
    return this.lecturerService.getLecturersByEntryYear(entryYear)
  }
}
