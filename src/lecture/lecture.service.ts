import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { lectureSelectOptions } from './dto'

@Injectable()
export class LectureService {
  @Inject()
  private prismaService!: PrismaService

  public listLectures() {
    return this.prismaService.lecture.findMany()
  }

  public async getLectureByLectureNo(lectureNo: string) {
    const lecture = await this.prismaService.findUnique({
      where: {
        lecture_no: lectureNo,
      },
      select: lectureSelectOptions,
    })

    if (!lecture) {
      throw new NotFoundException(
        `Unable to find lecture by no: ${lectureNo}`,
      )
    }

    return lecture
  }

  public getLecturesByLecturerReference(lecturerReference: number) {
    return this.prismaService.lecture.findMany({
      where: {
        lecturer_reference: lecturerReference,
      },
      select: lectureSelectOptions,
    })
  }
}
