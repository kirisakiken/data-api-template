import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {
    this.jwtSecret = this.configService.get('JWT_SECRET');
  }

  private readonly jwtSecret: string;

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

      return this.signToken(user.id, user.email);
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
      throw new ForbiddenException('Credentials incorrect');
    }

    const pwMatch = await argon.verify(user.hash, dto.password);
    if (!pwMatch) {
      throw new ForbiddenException('Credentials incorrect');
    }

    return this.signToken(user.id, user.email);
  }

  async signToken(userId: number, email: string) {
    const payload = {
      sub: userId,
      email: email,
    };

    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
      secret: this.jwtSecret,
    });

    return {
      access_token: token,
    };
  }
}
