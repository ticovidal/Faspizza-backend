import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('orders')
@ApiBearerAuth()
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Criar pedido' })
  @Post()
  create(@Req() req: any, @Body() dto: CreateOrderDto) {
    return this.ordersService.create(req.user.userId, dto);
  }
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Consultar histórico de status do pedido' })
  @Get(':id/history')
  findHistory(@Req() req: any, @Param('id') id: string) {
    return this.ordersService.findHistory(
        req.user.userId,
        id,
        req.user.role,
    );
  }
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Listar pedidos do usuário' })
  @Get()
  findAll(@Req() req: any) {
    return this.ordersService.findAllByUser(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Buscar pedido por ID' })
  @Get(':id')
  findOne(@Req() req: any, @Param('id') id: string) {
    return this.ordersService.findOneById(req.user.userId, id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Atualizar pedido' })
  @Patch(':id')
  update(
    @Req() req: any,
    @Param('id') id: string,
    @Body() dto: UpdateOrderDto,
  ) {
    return this.ordersService.update(req.user.userId, id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Excluir pedido' })
  @Delete(':id')
  remove(@Req() req: any, @Param('id') id: string) {
    return this.ordersService.remove(req.user.userId, id);
  }
}