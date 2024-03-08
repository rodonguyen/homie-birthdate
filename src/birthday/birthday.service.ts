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
    const birthday = await this.prismaService.birthday.create({
      data: {
        ...dto,
        userId,
      },
    });
    return birthday;
  }

  async getBirthdays(userId: number): Promise<Birthday[]> {
    return this.prismaService.birthday.findMany({
      where: {
        userId,
      },
    });
  }

  async getTodayBirthdays(code: string): Promise<Birthday[]> {
    // get user id from user table that has code==code or email==code
    const user = await this.prismaService.user.findFirst({
      where: {
        OR: [
          {
            accessCode: code,
          },
          {
            email: code,
          },
        ],
      },
    });

    if (!user || !user.id) {
      throw new NotFoundException("Code is invalid");
    }
    
    const currentDate = new Date().toLocaleString("en-US", { timeZone: "Australia/Brisbane" });
    console.log('currentDate', currentDate)
    const currentHour = new Date(currentDate).getHours();
    let queryFromDate = new Date(currentDate).getDate();
    let queryToDate = new Date(currentDate).getDate();
    const currentMonth = new Date(currentDate).getMonth() + 1;
    
    // Get birthdays from tomorrow if past 21:00 and yesterday if earlier than 6:00 (Brisbane time)
    if (currentHour > 21) {
      queryToDate = queryToDate + 1;
    } 
    else if (currentHour < 6) {
      queryFromDate = queryFromDate - 1;
    }

    return this.prismaService.birthday.findMany({
      where: {
      userId: user.id,
      day: {
        gte: queryFromDate,
        lte: queryToDate,
      },
      month: currentMonth,
      },
    });
  }

  // async getBirthdayById(userId: number, birthdayId: number): Promise<Birthday> {
  //   const birthday = await this.prismaService.birthday.findFirst({
  //     where: {
  //       id: birthdayId,
  //       userId,
  //     },
  //   });

  //   if (!birthday) {
  //     throw new NotFoundException("birthday not found");
  //   }

  //   return birthday;
  // }

  async editBirthdayById(
    userId: number,
    birthdayId: number,
    dto: EditBirthdayDto,
  ): Promise<Birthday> {
    const birthday = await this.prismaService.birthday.findFirst({
      where: {
        id: birthdayId,
        userId,
      },
    });

    if (!birthday) {
      throw new NotFoundException("Birthday not found");
    }

    return this.prismaService.birthday.update({
      where: {
        id: birthdayId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteBirthdayById(userId: number, birthdayId: number) {
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
