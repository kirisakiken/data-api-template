import { LecturerType } from '@prisma/client'
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator'

export class CreateLecturerDto {
  @IsInt()
  @IsNotEmpty()
  lecturerNo: number

  @IsString()
  @IsNotEmpty()
  firstName: string

  @IsString()
  @IsNotEmpty()
  lastName: string

  @IsEnum(LecturerType)
  @IsNotEmpty()
  lecturerType: LecturerType

  @IsInt()
  @IsNotEmpty()
  entryYear: number

  @IsInt()
  @IsNotEmpty()
  salary: number
}

export class UpdateLecturerDto {
  @IsInt()
  @IsNotEmpty()
  lecturerNo: number

  @IsString()
  @IsOptional()
  firstName?: string

  @IsString()
  @IsOptional()
  lastName?: string

  @IsEnum(LecturerType)
  @IsOptional()
  lecturerType?: LecturerType

  @IsInt()
  @IsOptional()
  entryYear?: number

  @IsInt()
  @IsOptional()
  salary?: number
}
