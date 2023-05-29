import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles-auth.guard';
import { AddRoleDto } from './dto/add-role.dto';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './roles.model';
import { RolesService } from './roles.service';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}

  @ApiOperation({ summary: 'Create role' })
  @ApiResponse({ status: 201, type: Role })
  @Post()
  create(@Body() dto: CreateRoleDto): Promise<Role> {
    return this.roleService.create(dto);
  }

  @ApiOperation({ summary: 'Get role by value' })
  @ApiResponse({ status: 200, type: Role })
  @Get(':value')
  get(@Param('value') value: string): Promise<Role> {
    return this.roleService.get(value);
  }

  @ApiOperation({ summary: 'Add role' })
  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Post('/add')
  add(@Body() dto: AddRoleDto): Promise<{ msg: string }> {
    return this.roleService.add(dto);
  }

  @ApiOperation({ summary: 'Delete role' })
  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Delete('/:id')
  delete(@Param('id') id: number): Promise<number> {
    return this.roleService.delete(id);
  }

  @ApiOperation({ summary: 'Update role' })
  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Put('/:id')
  update(
    @Param('id') id: number,
    @Body() option: Partial<Role>,
  ): Promise<[affectedRows: number]> {
    return this.roleService.update(id, option);
  }
}
