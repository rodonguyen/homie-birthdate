import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateBirthdayDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  link?: string;
}
