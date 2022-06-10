import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateLectureDto {
  @IsString()
  @IsNotEmpty()
  lectureNo: string

  @IsInt()
  @IsOptional()
  lecturerReference: number
}

export class UpdateLectureDto {
  @IsString()
  @IsNotEmpty()
  lectureNo: string

  @IsInt()
  @IsOptional()
  lecturerReference: number
}
