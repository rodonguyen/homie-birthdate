import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { EditUserDto } from "./dto";
import { StandardResponseMessageDto } from "src/dtos";

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async editUser(
    userId: number,
    dto: EditUserDto,
  ): Promise<StandardResponseMessageDto> {
    if (!dto || Object.keys(dto).length === 0) {
      return {
        success: true,
        message: "No data provided to edit user",
      };
    }

    const user = await this.prismaService.user.update({
      where: { id: userId },
      data: { ...dto },
    });

    delete user.hash;
    return {
      success: true,
      message: "Successfully updated user",
      data: user,
    };
  }
}
