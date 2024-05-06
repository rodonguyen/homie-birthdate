import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AccessTokenDto, SignInDto, SignUpDto } from "./dto";
import * as argon from "argon2";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { StandardResponseMessageDto } from "../dtos";

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: SignUpDto): Promise<StandardResponseMessageDto> {
    const hash = await argon.hash(dto.password);
    let user;

    try {
      user = await this.prismaService.user.create({
        data: {
          email: dto.email,
          hash,
          firstName: dto.firstName,
          lastName: dto.lastName,
        },
      });
      delete user.hash;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          // return {
          //   success: false,
          //   message: "Email already taken",
          // }
          throw new ForbiddenException("Credentials taken");
        }
      }
      throw error;
    }

    return {
      success: true,
      message: "Successfully signed up",
      data: user,
    };
  }

  async signin(dto: SignInDto): Promise<AccessTokenDto> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    // todo: replace with StandardResponseMessageDto
    if (!user) throw new ForbiddenException("Credentials incorrect");

    const pwMatches = await argon.verify(user.hash, dto.password);

    // todo: replace with StandardResponseMessageDto
    if (!pwMatches) throw new ForbiddenException("Credentials incorrect");

    const accessToken = await this.signToken(user.id, user.email);
    return { accessToken: accessToken };
  }

  async signToken(userId: number, email: string): Promise<string> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get("JWT_SECRET");

    const token = await this.jwt.signAsync(payload, {
      expiresIn: "1d",
      secret: secret,
    });

    return token;
  }
}
