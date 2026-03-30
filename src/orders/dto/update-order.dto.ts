import { IsOptional, IsString, MinLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateOrderDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @ApiPropertyOptional({ example: 'Pizza Portuguesa' })
  title?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'Sem azeitona' })
  description?: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  @ApiPropertyOptional({ example: 'Rua B, 456' })
  address?: string;
}