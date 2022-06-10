import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common'
import { JwtGuard } from '../auth/guard'
import { CreateLectureDto, UpdateLectureDto } from './dto'
import { LectureService } from './lecture.service'

@UseGuards(JwtGuard)
@Controller('lecture')
export class LectureController {
  @Inject()
  private lectureService!: LectureService

  @Get()
  listLectures() {
    return this.lectureService.listLectures()
  }

  @Get('/by-lecture-no/:lecture_no')
  getLectureByLectureNo(@Param('lecture_no') lectureNo: string) {
    return this.lectureService.getLectureByLectureNo(lectureNo)
  }

  @Get('/by-lecturer-reference/:lecturer_reference')
  getLecturesByLecturerReference(
    @Param('lecturer_reference', ParseIntPipe) lecturerReference: number,
  ) {
    return this.lectureService.getLecturesByLecturerReference(lecturerReference)
  }

  @Post('/create')
  createLecture(@Body() dto: CreateLectureDto) {
    return this.lectureService.createLecture(dto)
  }

  @Patch('/update')
  updateLecture(@Body() dto: UpdateLectureDto) {
    return this.lectureService.updateLecture(dto)
  }
}
