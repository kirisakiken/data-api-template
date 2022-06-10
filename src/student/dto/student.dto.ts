import { StudentType } from '@prisma/client'
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator'

export class CreateStudentDto {
  @IsInt()
  @IsNotEmpty()
  studentNo: number

  @IsString()
  @IsNotEmpty()
  firstName: string

  @IsString()
  @IsNotEmpty()
  lastName: string

  @IsEnum(StudentType)
  @IsNotEmpty()
  studentType: StudentType

  @IsInt()
  @IsNotEmpty()
  entryYear: number
}

export class UpdateStudentDto {
  @IsInt()
  @IsNotEmpty()
  studentNo: number

  @IsString()
  @IsOptional()
  firstName?: string

  @IsString()
  @IsOptional()
  lastName?: string

  @IsEnum(StudentType)
  @IsOptional()
  studentType?: StudentType

  @IsInt()
  @IsOptional()
  entryYear?: number
}
