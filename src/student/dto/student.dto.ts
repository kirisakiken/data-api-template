import { StudentType } from "@prisma/client";
import { IsEnum, IsInt, IsNotEmpty, IsString } from "class-validator";

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