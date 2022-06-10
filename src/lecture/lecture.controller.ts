import {
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common'
import { JwtGuard } from '../auth/guard'
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
}
