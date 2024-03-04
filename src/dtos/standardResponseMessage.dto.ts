import {
  IsBoolean,
  IsOptional,
  IsString,
} from 'class-validator';

export class StandardResponseMessageDto {
  @IsBoolean()
  success: boolean;

  @IsString()
  message: string;

  @IsOptional()
  data?: object;
}
