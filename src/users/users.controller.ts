import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@Controller('users')
export class UsersController {
  constructor(private users: UsersService) {}

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.users.create(dto);
  }

  @Get()
  findAll() {
    return this.users.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.users.update(Number(id), dto);
  }

  @Patch(':id/activate')
  activate(@Param('id') id: string) {
    return this.users.setActive(Number(id), true);
  }

  @Patch(':id/deactivate')
  deactivate(@Param('id') id: string) {
    return this.users.setActive(Number(id), false);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.users.remove(Number(id));
  }
}