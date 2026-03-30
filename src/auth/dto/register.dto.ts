import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @IsString()
  @ApiProperty({ example: 'Thiago' })
  name: string;

  @IsEmail()
  @ApiProperty({ example: 'teste@fastpizza.com' })
  email: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({ example: '123456' })
  password: string;
}