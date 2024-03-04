import { Module } from '@nestjs/common';
import { BirthdayService } from './bookmark.service';
import { BookmarkController } from './bookmark.controller';

@Module({
  providers: [ BirthdayService],
  controllers: [BookmarkController]
})
export class BookmarkModule {}
