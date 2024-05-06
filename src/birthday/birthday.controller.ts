import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { JwtGuard } from "../auth/guard";
import { BirthdayService } from "./birthday.service";
import { GetUser } from "../auth/decorator/getUser.decorator";
import { CreateBirthdayDto, EditBirthdayDto } from "./dto";

@Controller("birthday")
export class BirthdayController {
  constructor(private birthdayService: BirthdayService) {}

  @UseGuards(JwtGuard)
  @Post()
  createBirthday(
    @GetUser("id") userId: number,
    @Body() createBookmarkDto: CreateBirthdayDto,
  ) {
    return this.birthdayService.createbirthday(userId, createBookmarkDto);
  }

  @UseGuards(JwtGuard)
  @Get()
  getBookmarks(@GetUser("id") userId: number) {
    return this.birthdayService.getBirthdays(userId);
  }

  @Get(":c")
  getTodayBirthdays(@Param("c") code: string) {
    return this.birthdayService.getTodayBirthdays(code);
  }

  // @Get(':id')
  // getBookmarkById(@GetUser("id") userId: number, @Param("id", ParseIntPipe) bookmarkId: number) {
  //   return this.birthdayService.getBirthdayById(userId, bookmarkId);
  // }

  @UseGuards(JwtGuard)
  @Patch(":id")
  editBookmarkById(
    @GetUser("id") userId: number,
    @Param("id", ParseIntPipe) bookmarkId,
    @Body() editBookmarkDto: EditBirthdayDto,
  ) {
    return this.birthdayService.editBirthdayById(
      userId,
      bookmarkId,
      editBookmarkDto,
    );
  }

  @UseGuards(JwtGuard)
  @Delete(":id")
  deleteBookmarkById(
    @GetUser("id") userId: number,
    @Param("id", ParseIntPipe) bookmarkId: number,
  ) {
    return this.birthdayService.deleteBirthdayById(userId, bookmarkId);
  }
}
