import { INestApplication, ValidationPipe } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { PrismaService } from '../src/prisma/prisma.service'
import { AppModule } from '../src/app.module'
import * as pactum from 'pactum'
import { AuthDto } from 'src/auth/dto'
import { EditUserDto } from 'src/user/dto'

describe('App e2e', () => {
  let app: INestApplication
  let prismaService: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(3333)

    prismaService = app.get(PrismaService);
    await prismaService.clearDb()

    pactum.request.setBaseUrl('http://localhost:3333')
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    const dto: AuthDto = {
      email: 'mock-sigup@mail.com',
      password: 'mock-pw',
    };

    describe('Signup', () => {
      const signupPath: string = '/auth/signup';
      it('signup successfully', () => {
        return pactum.spec().post(signupPath).withBody(dto).expectStatus(201);
      });

      it('signup fails when email is not provided', () => {
        return pactum
          .spec()
          .post(signupPath)
          .withBody({ password: 'pw1' })
          .expectStatus(400);
      });

      it('signup fails when password is not provided', () => {
        return pactum
          .spec()
          .post(signupPath)
          .withBody({ email: 'test@kken.com' })
          .expectStatus(400);
      });

      it('signup fails when email is not valid email', () => {
        return pactum
          .spec()
          .post(signupPath)
          .withBody({
            email: 'invalid-email',
            password: 'test-pw',
          })
          .expectStatus(400);
      });

      it('signup fails when email and password are not provided', () => {
        return pactum.spec().post(signupPath).withBody({}).expectStatus(400);
      });
    });

    describe('Signin', () => {
      const signinPath: string = '/auth/signin';

      it('sigin successfully', () => {
        return pactum
          .spec()
          .post(signinPath)
          .withBody(dto)
          .expectStatus(200)
          .stores('userAccessToken', 'access_token'); // save generated access token to pactums mem
      });

      it('signin fails when user does not exists', () => {
        return pactum
          .spec()
          .post(signinPath)
          .withBody({
            email: 'invalid@mail.com',
            password: 'pw',
          })
          .expectStatus(403);
      });

      it('signin fails when email is not provided', () => {
        return pactum
          .spec()
          .post(signinPath)
          .withBody({ password: 'pw1' })
          .expectStatus(400);
      });

      it('singin fails when password is not provided', () => {
        return pactum
          .spec()
          .post(signinPath)
          .withBody({ email: dto.email })
          .expectStatus(400);
      });

      it('signin fails when email and password is not provided', () => {
        return pactum.spec().post(signinPath).withBody({}).expectStatus(400);
      });
    });
  });

  describe('User', () => {
    describe('Get me', () => {
      const getMePath: string = '/users/me';
      it('get user successfully', () => {
        return pactum
          .spec()
          .get(getMePath)
          .withHeaders({
            Authorization: 'Bearer $S{userAccessToken}', // $S{} -> reference pactum var
          })
          .expectStatus(200);
      });

      it('get user fails when access token is not provided', () => {
        return pactum.spec().get(getMePath).expectStatus(401);
      });

      it('get user fails when provided invalid access token', () => {
        return pactum
          .spec()
          .get(getMePath)
          .withHeaders({
            Authorization: 'Bearer invalid.access.token',
          })
          .expectStatus(401);
      });
    });

    describe('Update user', () => {
      const editUserPath: string = '/users/update'
      it('update user successfully', () => {
        const dto: EditUserDto = {
          email: 'updatedEmail@kirisaki.com',
          firstName: 'Kirisaki',
          lastName: 'Ken',
        }
        return pactum.spec()
        .patch(editUserPath)
        .withHeaders({
          Authorization: 'Bearer $S{userAccessToken}',
        })
        .withBody(dto)
        .expectStatus(200)
        .expectBodyContains(dto.email)
        .expectBodyContains(dto.firstName)
        .expectBodyContains(dto.lastName)
      })

      it('update email only', async () => {
        const dto: EditUserDto = {
          email: 'only-email@kirisaki.com',
        }

        const user = await prismaService.user.findUnique({
          where: {
            email: 'updatedEmail@kirisaki.com',
          },
        })

        return pactum.spec()
        .patch(editUserPath)
        .withHeaders({
          Authorization: 'Bearer $S{userAccessToken}',
        })
        .withBody(dto)
        .expectStatus(200)
        .expectBodyContains(dto.email)
        .expectBodyContains(user.firstName)
        .expectBodyContains(user.lastName)
      })
      
      it('update firstName only', async () => {
        const dto: EditUserDto = {
          firstName: 'updateName',
        }

        const user = await prismaService.user.findUnique({
          where: {
            email: 'only-email@kirisaki.com',
          },
        })

        return pactum.spec()
        .patch(editUserPath)
        .withHeaders({
          Authorization: 'Bearer $S{userAccessToken}',
        })
        .withBody(dto)
        .expectStatus(200)
        .expectBodyContains(user.email)
        .expectBodyContains(dto.firstName)
        .expectBodyContains(user.lastName)
      })

      it('update lastName only', async () => {
        const dto: EditUserDto = {
          lastName: 'updateLastName',
        }

        const user = await prismaService.user.findUnique({
          where: {
            email: 'only-email@kirisaki.com',
          },
        })

        return pactum.spec()
        .patch(editUserPath)
        .withHeaders({
          Authorization: 'Bearer $S{userAccessToken}',
        })
        .withBody(dto)
        .expectStatus(200)
        .expectBodyContains(user.email)
        .expectBodyContains(user.firstName)
        .expectBodyContains(dto.lastName)
      })

      it('update nothing when body is empty', async () => {
        const dto: EditUserDto = {}

        const user = await prismaService.user.findUnique({
          where: {
            email: 'only-email@kirisaki.com',
          },
        })

        return pactum.spec()
        .patch(editUserPath)
        .withHeaders({
          Authorization: 'Bearer $S{userAccessToken}',
        })
        .withBody(dto)
        .expectStatus(200)
        .expectBodyContains(user.email)
        .expectBodyContains(user.firstName)
        .expectBodyContains(user.lastName)
      })

      it('update user fails when authorization header is not provided', () => {
        const updateUserDto: EditUserDto = {
          email: 'updatedEmail@kirisaki.com',
          firstName: 'Kirisaki',
          lastName: 'Ken',
        }
        return pactum.spec()
        .patch(editUserPath)
        .withBody(updateUserDto)
        .expectStatus(401)
      })
    })
  })

  describe('Bookmark', () => {
    describe('Create bookmark', () => {});

    describe('Get bookmarks', () => {});

    describe('Get bookmark by id', () => {});

    describe('Edit bookmark', () => {});

    describe('Delete bookmark', () => {});
  })
})