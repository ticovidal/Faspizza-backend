import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

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

  findAllByUser(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOneById(userId: string, orderId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      throw new NotFoundException('Pedido não encontrado');
    }

    if (order.userId !== userId) {
      throw new ForbiddenException('Você não pode acessar este pedido');
    }

    return order;
  }

  async update(userId: string, orderId: string, dto: UpdateOrderDto) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      throw new NotFoundException('Pedido não encontrado');
    }

    if (order.userId !== userId) {
      throw new ForbiddenException('Você não pode editar este pedido');
    }

    if (order.status !== 'pending') {
      throw new ForbiddenException(
        'Só é possível editar pedidos com status pending',
      );
    }

    if (!dto) {
      throw new ForbiddenException('Corpo da requisição ausente');
    }

    return this.prisma.order.update({
      where: { id: orderId },
      data: {
        ...(dto.title !== undefined && { title: dto.title }),
        ...(dto.description !== undefined && { description: dto.description }),
        ...(dto.address !== undefined && { address: dto.address }),
      },
    });
  }

  async remove(userId: string, orderId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      throw new NotFoundException('Pedido não encontrado');
    }

    if (order.userId !== userId) {
      throw new ForbiddenException('Você não pode excluir este pedido');
    }

    if (order.status !== 'pending') {
      throw new ForbiddenException(
        'Só é possível excluir pedidos com status pending',
      );
    }

    return this.prisma.order.delete({
      where: { id: orderId },
    });
  }
  async findHistory(userId: string, orderId: string, userRole: string) {
    const order = await this.prisma.order.findUnique({
        where: { id: orderId },
    });

    if (!order) {
        throw new NotFoundException('Pedido não encontrado');
    }

    if (userRole !== 'admin' && order.userId !== userId) {
        throw new ForbiddenException(
        'Você não pode acessar o histórico deste pedido',
        );
    }

    return this.prisma.statusHistory.findMany({
        where: { orderId },
        orderBy: { createdAt: 'asc' },
        include: {
        changedByUser: {
            select: {
            id: true,
            name: true,
            email: true,
            role: true,
            },
        },
        },
    });
  }
}