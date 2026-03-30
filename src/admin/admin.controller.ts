import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { ChangeStatusDto } from './dto/change-status.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('admin')
@ApiBearerAuth()
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Listar todos os pedidos (admin)' })
  @Get('orders')
  findAllOrders() {
    return this.adminService.findAllOrders();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Alterar status do pedido (admin)' })
  @Patch('orders/:id/status')
  changeOrderStatus(
    @Req() req: any,
    @Param('id') id: string,
    @Body() dto: ChangeStatusDto,
  ) {
    return this.adminService.changeOrderStatus(req.user.userId, id, dto);
  }
}