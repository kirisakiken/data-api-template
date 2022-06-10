import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { BookmarkModule } from './bookmark/bookmark.module'
import { UserModule } from './user/user.module'
import { PrismaModule } from './prisma/prisma.module'
import { ConfigModule } from '@nestjs/config'
import { StudentModule } from './student/student.module'
import { LecturerModule } from './lecturer/lecturer.module'
import { LectureModule } from './lecture/lecture.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    BookmarkModule,
    UserModule,
    PrismaModule,
    StudentModule,
    LecturerModule,
    LectureModule,
  ],
})
export class AppModule {}
