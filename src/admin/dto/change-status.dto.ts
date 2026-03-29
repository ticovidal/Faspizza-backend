import { IsEnum, IsOptional, IsString } from 'class-validator';

export class ChangeStatusDto {
  @IsEnum([
    'pending',
    'confirmed',
    'preparing',
    'out_for_delivery',
    'delivered',
    'canceled',
  ])
  status:
    | 'pending'
    | 'confirmed'
    | 'preparing'
    | 'out_for_delivery'
    | 'delivered'
    | 'canceled';

  @IsOptional()
  @IsString()
  note?: string;
}