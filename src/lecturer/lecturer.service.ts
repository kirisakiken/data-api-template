import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { LecturerType } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import { lecturerSelectOptions } from './dto'

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
      throw new NotFoundException(`Unable to find lecturer by no: ${lecturerNo}`)
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
}
