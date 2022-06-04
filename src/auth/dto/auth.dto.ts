import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

// interface IAuthDto {
//   email: string;
//   password: string;
// }

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
