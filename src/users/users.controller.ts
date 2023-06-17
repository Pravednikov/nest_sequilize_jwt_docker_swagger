import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles-auth.guard';
import { User } from './users.model';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Get users' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  getAll(): Promise<User[]> {
    return this.usersService.getAll();
  }

  @ApiOperation({ summary: 'Get user with email' })
  @ApiResponse({ status: 200, type: [User] })
  @Get('/:email')
  get(@Param('email') email: string): Promise<User> {
    return this.usersService.get(email);
  }

  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Delete('/:id')
  delete(@Param('id') id: number): Promise<number> {
    return this.usersService.delete(id);
  }

  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200 })
  @ApiParam({ required: true, name: 'id', example: { id: 2 } })
  @Put('/:id')
  update(
    @Param('id') id: number,
    @Body() option: Partial<User>,
  ): Promise<[affectedRows: number]> {
    return this.usersService.update(id, option);
  }
}
