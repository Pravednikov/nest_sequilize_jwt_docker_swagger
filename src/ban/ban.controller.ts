import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles-auth.guard';
import { BanService } from './ban.service';
import { BanUserDto } from './dto/ban-user.dto';

@ApiTags('Ban')
@Controller('ban')
export class BanController {
  constructor(private readonly banService: BanService) {}

  @ApiOperation({ summary: 'Ban' })
  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post()
  async ban(@Body() dto: BanUserDto): Promise<[affectedRows: number]> {
    return this.banService.ban(dto);
  }
}
