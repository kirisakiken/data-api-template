import { ConfigModule } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from '../prisma/prisma.service'
import { StudentController } from './student.controller'
import { StudentService } from './student.service'

describe('StudentController', () => {
  // let configService: ConfigService
  let prismaService: PrismaService
  let studentController: StudentController
  let studentService: StudentService

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
      controllers: [StudentController],
      providers: [
        PrismaService,
        StudentService,
      ],
    }).compile()

    prismaService = module.get<PrismaService>(PrismaService)

    studentController = module.get<StudentController>(StudentController)
    studentService = module.get<StudentService>(StudentService)
  })

  beforeEach(async () => {
    await prismaService.student.createMany({
      data: [
        {
          student_no: 1,
          first_name: 's-fn-1',
          last_name: 's-ln-1',
          student_type: 'associate',
          entry_year: 2022,
        },
        {
          student_no: 2,
          first_name: 's-fn-2',
          last_name: 's-ln-2',
          student_type: 'bachelors',
          entry_year: 2022,
        },
      ]
    })
  })

  afterEach(async () => {
    await prismaService.student.deleteMany()
  })

  describe('dependencies', () => {
    it('dependencies should be defined', () => {
      expect(prismaService).toBeDefined()
  
      expect(studentController).toBeDefined()
      expect(studentService).toBeDefined()
    })
  })
  
  describe('StudentController Get', () => {
    describe('listStudents', () => {
      it('list successfully', async () => {
        const result = await studentController.listStudents()
        expect(result).toMatchSnapshot()
      })
    })

    describe('getStudentByNo', () => {
      it('get sucessfully', async () => {

      })
    })
  })
})
