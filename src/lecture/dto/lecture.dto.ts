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
  @IsOptional()
  lectureNo: string

  @IsInt()
  @IsOptional()
  lecturerReference: number
}
