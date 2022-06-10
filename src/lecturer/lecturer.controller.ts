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
} from '@nestjs/common'
import { LecturerType } from '@prisma/client'
import { JwtGuard } from '../auth/guard'
import { CreateLecturerDto, UpdateLecturerDto } from './dto'
import { LecturerService } from './lecturer.service'

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
  getLecturersByEntryYear(
    @Param('entry_year', ParseIntPipe) entryYear: number,
  ) {
    return this.lecturerService.getLecturersByEntryYear(entryYear)
  }

  @Post('/create')
  createLecturer(@Body() dto: CreateLecturerDto) {
    return this.lecturerService.createLecturer(dto)
  }

  @Patch('/update')
  updateLecturer(@Body() dto: UpdateLecturerDto) {
    return this.lecturerService.updateLecturer(dto)
  }

  @Delete('/delete/by-lecturer-no/:lecturer_no')
  deleteLecturerByLecturerNo(
    @Param('lecturer_no', ParseIntPipe) lecturerNo: number,
  ) {
    return this.lecturerService.deleteLecturerByLecturerNo(lecturerNo)
  }
}
