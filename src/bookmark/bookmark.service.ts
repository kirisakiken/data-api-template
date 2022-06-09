import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookMarkDto, UpdateBookmarkDto } from './dto';

@Injectable()
export class BookmarkService {
  constructor(private prismaService: PrismaService) {}

  getBookmarks(userId: number) {
    return this.prismaService.getAllBookmarks(userId);
  }

  getBookmarkById(userId: number, bookmarkId: number) {
    return this.prismaService.getBookmark(userId, bookmarkId);
  }

  createBookmark(userId: number, dto: CreateBookMarkDto) {
    return this.prismaService.createBookmark(userId, dto);
  }

  updateBookmarkById(
    userId: number,
    bookmarkId: number,
    dto: UpdateBookmarkDto,
  ) {
    return this.prismaService.updateBookmark(userId, bookmarkId, dto);
  }

  deleteBookmarkById(userId: number, bookmarkId: number) {
    return this.prismaService.deleteBookmarkById(userId, bookmarkId);
  }
}
