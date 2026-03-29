import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  create(userId: string, dto: CreateOrderDto) {
    return this.prisma.order.create({
      data: {
        title: dto.title,
        description: dto.description,
        address: dto.address,
        userId,
      },
    });
  }
}