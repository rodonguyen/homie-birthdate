import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateBirthdayDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  nickname?: string;

  @IsString()
  @IsOptional()
  cardTitle?: string;

  @IsString()
  @IsOptional()
  cardMessage?: string;

  @IsNumber()
  day: number;

  @IsNumber()
  month: number;

  @IsNumber()
  @IsOptional()
  year?: number;
}
