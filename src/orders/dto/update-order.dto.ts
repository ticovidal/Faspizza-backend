import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateOrderDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  address?: string;
}