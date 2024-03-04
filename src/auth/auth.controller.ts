import { Body, Controller, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignUpDto } from "./dto";
import { StandardResponseMessageDto } from "../dtos";
import { AccessTokenDto } from "./dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("signup")
  signup(@Body() dto: SignUpDto) : Promise<StandardResponseMessageDto>{
    return this.authService.signup(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post("signin")
  signin(@Body() dto: SignUpDto) : Promise<AccessTokenDto> {
    return this.authService.signin(dto);
  }
}
