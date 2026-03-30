import { IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @IsString()
  @MinLength(3)
  @ApiProperty({ example: 'Pizza Calabresa' })
  title: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Sem cebola' , required: false })
  description?: string;

  @IsString()
  @MinLength(5)
  @ApiProperty({ example: 'Rua A, 123' })
  address: string;
}