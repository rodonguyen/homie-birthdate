import { Body, Controller, Get, Patch, UseGuards } from "@nestjs/common";
import { JwtGuard } from "../auth/guard";
import { GetUser } from "../auth/decorator";
import { User } from "@prisma/client";
import { EditUserDto } from "./dto";
import { UserService } from "./user.service";
import { StandardResponseMessageDto } from "src/dtos";

@UseGuards(JwtGuard)
@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @Get("me")
  getMe(@GetUser() user: User): User {
    return user;
  }

  @Patch()
  editUser(
    @GetUser("id") userId: number,
    @Body() dto: EditUserDto,
  ): Promise<StandardResponseMessageDto> {
    return this.userService.editUser(userId, dto);
  }
}
