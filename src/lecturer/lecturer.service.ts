import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { LecturerType } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import {
  CreateLecturerDto,
  lecturerSelectOptions,
  UpdateLecturerDto,
} from './dto'

@Injectable()
export class LecturerService {
  @Inject()
  private prismaService!: PrismaService

  public listLecturers() {
    return this.prismaService.lecturer.findMany()
  }

  public async getLecturerByNo(lecturerNo: number) {
    const lecturer = await this.prismaService.lecturer.findUnique({
      where: {
        lecturer_no: lecturerNo,
      },
      select: lecturerSelectOptions,
    })

    if (!lecturer) {
      throw new NotFoundException(
        `Unable to find lecturer by no: ${lecturerNo}`,
      )
    }

    return lecturer
  }

  public getLecturersByType(lecturerType: LecturerType) {
    return this.prismaService.lecturer.findMany({
      where: {
        lecturer_type: lecturerType,
      },
      select: lecturerSelectOptions,
    })
  }

  public getLecturersByEntryYear(entryYear: number) {
    return this.prismaService.lecturer.findMany({
      where: {
        entry_year: entryYear,
      },
      select: lecturerSelectOptions,
    })
  }

  public async createLecturer(dto: CreateLecturerDto) {
    const lecturer = await this.prismaService.lecturer.findUnique({
      where: {
        lecturer_no: dto.lecturerNo,
      },
    })

    if (lecturer) {
      throw new ConflictException(
        `Lecturer with no: ${dto.lecturerNo} already exists`,
      )
    }

    return this.prismaService.lecturer.create({
      data: {
        lecturer_no: dto.lecturerNo,
        first_name: dto.firstName,
        last_name: dto.lastName,
        lecturer_type: dto.lecturerType,
        entry_year: dto.entryYear,
        salary: dto.salary,
      },
      select: lecturerSelectOptions,
    })
  }

  public async updateLecturer(dto: UpdateLecturerDto) {
    await this.getLecturerByNo(dto.lecturerNo)
    return this.prismaService.lecturer.update({
      where: {
        lecturer_no: dto.lecturerNo,
      },
      data: {
        lecturer_no: dto.lecturerNo,
        first_name: dto.firstName,
        last_name: dto.lastName,
        lecturer_type: dto.lecturerType,
        entry_year: dto.entryYear,
        salary: dto.salary,
      },
      select: lecturerSelectOptions,
    })
  }

  public async deleteLecturerByLecturerNo(lecturerNo: number) {
    await this.getLecturerByNo(lecturerNo)
    return this.prismaService.lecturer.delete({
      where: {
        lecturer_no: lecturerNo,
      },
      select: lecturerSelectOptions,
    })
  }
}
