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
    @Body() createBirthdayDto: CreateBirthdayDto,
  ) {
    return this.birthdayService.createbirthday(userId, createBirthdayDto);
  }

  @UseGuards(JwtGuard)
  @Get()
  getBirthdays(@GetUser("id") userId: number) {
    return this.birthdayService.getBirthdays(userId);
  }

  @Get(":c")
  getTodayBirthdays(@Param("c") code: string) {
    return this.birthdayService.getTodayBirthdays(code);
  }

  // @Get(':id')
  // getBirthdayById(@GetUser("id") userId: number, @Param("id", ParseIntPipe) birthdayId: number) {
  //   return this.birthdayService.getBirthdayById(userId, birthdayId);
  // }

  @UseGuards(JwtGuard)
  @Patch(":id")
  editBirthdayById(
    @GetUser("id") userId: number,
    @Param("id", ParseIntPipe) birthdayId,
    @Body() editBirthdayDto: EditBirthdayDto,
  ) {
    return this.birthdayService.editBirthdayById(
      userId,
      birthdayId,
      editBirthdayDto,
    );
  }

  @UseGuards(JwtGuard)
  @Delete(":id")
  deleteBirthdayById(
    @GetUser("id") userId: number,
    @Param("id", ParseIntPipe) birthdayId: number,
  ) {
    return this.birthdayService.deleteBirthdayById(userId, birthdayId);
  }
}
