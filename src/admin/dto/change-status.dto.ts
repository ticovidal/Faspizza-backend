import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ChangeStatusDto {
  @IsEnum([
    'pending',
    'confirmed',
    'preparing',
    'out_for_delivery',
    'delivered',
    'canceled',
  ])
  @ApiProperty({
  example: 'confirmed',
  enum: ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'canceled'],
})
  status:
    | 'pending'
    | 'confirmed'
    | 'preparing'
    | 'out_for_delivery'
    | 'delivered'
    | 'canceled';

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'Pedido confirmado pela cozinha' })
  note?: string;
}