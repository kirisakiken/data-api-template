import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { BookmarkService } from './bookmark.service';
import { CreateBookMarkDto, UpdateBookmarkDto } from './dto';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
	constructor(private bookmarkService: BookmarkService) {}

	@Get()
	getBookmarks(
		@GetUser('sub') userId: number) {
		return this.bookmarkService.getBookmarks(userId)
	}

	@Get(':id')
	getBookmarkById(
		@GetUser('sub') userId: number,
		@Param('id', ParseIntPipe) bookmarkId: number,
	) {
		return this.bookmarkService.getBookmarkById(userId, bookmarkId)
	}

	@Post()
	createBookmark(
		@GetUser('sub') userId: number,
		@Body() dto: CreateBookMarkDto,
	) {
		return this.bookmarkService.createBookmark(userId, dto)
	}

	@Patch(':id')
	updateBookmarkById(
		@GetUser('sub') userId: number,
		@Param('id', ParseIntPipe) bookmarkId: number,
		@Body() dto: UpdateBookmarkDto,
	) {
		return this.bookmarkService.updateBookmarkById(userId, bookmarkId, dto)
	}

	@Delete(':id')
	deleteBookmarkById(
		@GetUser('sub') userId: number,
		@Param('id', ParseIntPipe) bookmarkId: number,
	) {
		return this.bookmarkService.deleteBookmarkById(userId, bookmarkId)
	}
}
