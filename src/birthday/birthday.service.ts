import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateBirthdayDto, EditBirthdayDto } from "./dto";
import { Birthday } from "@prisma/client";

@Injectable()
export class BirthdayService {
  constructor(private prismaService: PrismaService) {}

  async createbirthday(userId: number, dto: CreateBirthdayDto) {
    // const birthday = await this.prismaService.birthday.create({
    //   data: {
    //     userId,
    //     ...dto,
    //   },
    // });
    // return birthday;
  }

  async getbirthdays(userId: number): Promise<Birthday[]> {
    return this.prismaService.birthday.findMany({
      where: {
        userId,
      },
    });
  }

  async getbirthdayById(userId: number, birthdayId: number): Promise<Birthday> {
    const birthday = await this.prismaService.birthday.findFirst({
      where: {
        id: birthdayId,
        userId,
      },
    });

    if (!birthday) {
      throw new NotFoundException("birthday not found");
    }

    return birthday;
  }

  // async editbirthdayById(
  //   userId: number,
  //   birthdayId: number,
  //   dto: EditBirthdayDto,
  // ): Promise<Birthday> {
  //   const birthday = await this.prismaService.birthday.findFirst({
  //     where: {
  //       id: birthdayId,
  //       userId,
  //     },
  //   });

  //   if (!birthday) {
  //     throw new NotFoundException("birthday not found");
  //   }

  //   return this.prismaService.birthday.update({
  //     where: {
  //       id: birthdayId,
  //     },
  //     data: {
  //       ...dto,
  //     },
  //   });
  // }
  async deletebirthdayById(userId: number, birthdayId: number) {
    const birthday = await this.prismaService.birthday.findUnique({
      where: {
        id: birthdayId,
      },
    });

    if (!birthday) {
      throw new NotFoundException("birthday not found");
    }

    if (birthday.userId !== userId) {
      throw new ForbiddenException("Access to resources denied");
    }

    await this.prismaService.birthday.delete({
      where: {
        id: birthdayId,
        userId,
      },
    });
  }
}
