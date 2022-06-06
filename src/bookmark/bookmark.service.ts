import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookMarkDto, UpdateBookmarkDto } from './dto';

@Injectable()
export class BookmarkService {
	constructor(private prismaService: PrismaService) {}

	getBookmarks(userId: number) {
		return this.prismaService.getAllBookmarks(userId)
	}

	getBookmarkById(userId: number, bookmarkId: number) {

	}

	createBookmark(userId: number, dto: CreateBookMarkDto) {

	}

	updateBookmarkById(userId: number, bookmarkId: number, dto: UpdateBookmarkDto) {

	}

	deleteBookmarkById(userId: number, bookmarkId: number) {

	}
}
