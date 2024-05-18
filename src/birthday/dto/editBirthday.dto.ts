import { IsOptional, IsString, IsNumber } from "class-validator";

export class EditBirthdayDto {
  @IsString()
  @IsOptional()
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
  @IsOptional()
  day: number;

  @IsNumber()
  @IsOptional()
  month: number;

  @IsNumber()
  @IsOptional()
  year?: number;
}
