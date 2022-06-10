import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { LecturerService } from '../lecturer/lecturer.service'
import { PrismaService } from '../prisma/prisma.service'
import { CreateLectureDto, lectureSelectOptions, UpdateLectureDto } from './dto'

@Injectable()
export class LectureService {
  @Inject()
  private prismaService!: PrismaService
  @Inject()
  private lecturerService!: LecturerService

  public listLectures() {
    return this.prismaService.lecture.findMany()
  }

  public async getLectureByLectureNo(lectureNo: string) {
    const lecture = await this.prismaService.lecture.findUnique({
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

  public async createLecture(dto: CreateLectureDto) {
    const lecture = await this.prismaService.lecture.findUnique({
      where: {
        lecture_no: dto.lectureNo,
      },
    })

    if (lecture) {
      throw new ConflictException(
        `Lecture by no: ${dto.lectureNo} already exists`,
      )
    }

    await this.validateRelations(dto)
    return this.prismaService.lecture.create({
      data: {
        lecture_no: dto.lectureNo,
        lecturer_reference: dto.lecturerReference,
      },
      select: lectureSelectOptions,
    })
  }

  public async updateLecture(dto: UpdateLectureDto) {
    await this.getLectureByLectureNo(dto.lectureNo)
    await this.validateRelations(dto)
    return this.prismaService.lecture.update({
      where: {
        lecture_no: dto.lectureNo,
      },
      data: {
        lecture_no: dto.lectureNo,
        lecturer_reference: dto.lecturerReference,
      },
      select: lectureSelectOptions,
    })
  }

  public async deleteLectureByLectureNo(lectureNo: string) {
    await this.getLectureByLectureNo(lectureNo)
    return this.prismaService.lecture.delete({
      where: {
        lecture_no: lectureNo,
      },
      select: lectureSelectOptions,
    })
  }

  // TODO: select options?
  public deleteLectureByLecturerReference(lecturerReference: number) {
    return this.prismaService.lecture.deleteMany({
      where: {
        lecturer_reference: lecturerReference,
      },
    })
  }

  private validateRelations(dto: CreateLectureDto | UpdateLectureDto) {
    return this.lecturerService.getLecturerByNo(dto.lecturerReference)
  }
}
