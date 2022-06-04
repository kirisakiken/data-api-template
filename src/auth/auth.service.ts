import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  async signup(dto: AuthDto) {
    const hash = await argon.hash(dto.password);

    try {
      const user = await this.prismaService.user.create({
        // TODO : implement converter
        data: {
          email: dto.email,
          hash: hash,
        },
      });

      delete user.hash;

      return user;
    } catch (ex: any) {
      if (ex instanceof PrismaClientKnownRequestError) {
        if (ex.code === 'P2002') {
          // TODO : have enum implementation for error codes
          throw new ForbiddenException('Credentials taken');
        }
      }

      throw ex;
    }
  }

  async signin(dto: AuthDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      },
    });

		if (!user) {
			throw new ForbiddenException(
				'Credentials incorrect',
			);
		}

		const pwMatch = await argon.verify(user.hash, dto.password);
		if (!pwMatch) {
			throw new ForbiddenException(
				'Credentials incorrect',
			);
		}

		delete user.hash
		return user
  }
}
