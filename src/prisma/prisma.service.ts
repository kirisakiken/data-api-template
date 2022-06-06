import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { CreateBookMarkDto, UpdateBookmarkDto } from 'src/bookmark/dto';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(private configService: ConfigService) {
    super({
      datasources: {
        db: {
          url: configService.get('DATABASE_URL'),
        },
      },
    });
  }

  clearDb() {
    return this.$transaction([
      this.bookmark.deleteMany(),
      this.user.deleteMany(),
    ]);
  }

  //#region Bookmarks Repository Calls

  getAllBookmarks(userId: number) {
    return this.bookmark.findMany({
      where: {
        user_id: userId,
      },
    })
  }

  getBookmark(userId: number, bookmarkId: number) {
    return this.bookmark.findFirst({
      where: {
        id: bookmarkId,
        user_id: userId,
      },
    })
  }

  createBookmark(userId: number, dto: CreateBookMarkDto) {
    return this.bookmark.create({
      data: {
        user_id: userId,
        ...dto,
      },
    })
  }

  updateBookmark(userId: number, bookmarkId: number, dto: UpdateBookmarkDto) {

  }

  deleteBookmarkById(userId: number, bookmarkId: number) {

  }

  //#endregion
}
