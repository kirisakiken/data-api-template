import { INestApplication, ValidationPipe } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import { PrismaService } from "../src/prisma/prisma.service"
import { AppModule } from "../src/app.module"
import * as pactum from 'pactum'
import { AuthDto } from "src/auth/dto"
import { setDefaultExpectStatus } from "pactum/src/exports/response"

describe('App e2e', () => {

  let app: INestApplication;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    )
    await app.init()
    await app.listen(3333)

    prismaService = app.get(PrismaService)
    await prismaService.clearDb()

    pactum.request.setBaseUrl('http://localhost:3333')
  })

  afterAll(() => {
    app.close()
  })

  describe('Auth', () => {
    const dto: AuthDto = {
      email: 'mock-sigup@mail.com',
      password: 'mock-pw',
    }

    describe('Signup', () => {
      const signupPath: string = '/auth/signup'
      it('signup successfully', () => {
        return pactum.spec().post(signupPath)
        .withBody(dto)
        .expectStatus(201)
      })

      it('signup fails when email is not provided', () => {
        return pactum.spec().post(signupPath)
        .withBody({ password: 'pw1' })
        .expectStatus(400)
      })

      it('signup fails when password is not provided', () => {
        return pactum.spec().post(signupPath)
        .withBody({ email: 'test@kken.com' })
        .expectStatus(400)
      })

      it('signup fails when email is not valid email', () => {
        return pactum.spec().post(signupPath)
        .withBody({
          email: 'invalid-email',
          password: 'test-pw',
        })
        .expectStatus(400)
      })

      it('signup fails when email and password are not provided', () => {
        return pactum.spec().post(signupPath)
        .withBody({})
        .expectStatus(400)
      })
    })

    describe('Signin', () => {
      const signinPath: string = '/auth/signin'

      it('sigin successfully', () => {
        return pactum.spec().post(signinPath)
        .withBody(dto)
        .expectStatus(200)
        .stores('userAccessToken', 'access_token') // save generated access token to pactums mem
      })

      it('signin fails when user does not exists', () => {
        return pactum.spec().post(signinPath)
        .withBody({
          email: 'invalid@mail.com',
          password: 'pw',
        })
        .expectStatus(403)
      })

      it('signin fails when email is not provided', () => {
        return pactum.spec().post(signinPath)
        .withBody({ password: 'pw1' })
        .expectStatus(400)
      })

      it('singin fails when password is not provided', () => {
        return pactum.spec().post(signinPath)
        .withBody({ email: dto.email })
        .expectStatus(400)
      })

      it('signin fails when email and password is not provided', () => {
        return pactum.spec().post(signinPath)
        .withBody({})
        .expectStatus(400)
      })
    })
  })

  describe('User', () => {
    describe('Get me', () => {
      
    })

    describe('Edit user', () => {

    })
  })

  describe('Bookmark', () => {
    describe('Create bookmark', () => {

    })

    describe('Get bookmarks', () => {

    })

    describe('Get bookmark by id', () => {

    })

    describe('Edit bookmark', () => {

    })

    describe('Delete bookmark', () => {

    })
  })
})