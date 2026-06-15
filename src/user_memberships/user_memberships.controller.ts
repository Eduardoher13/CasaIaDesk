import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { UserMembershipService } from './user_memberships.service';
import { CreateUserMembershipDto } from './dto/create-user-membership.dto';
import { UpdateUserMembershipDto } from './dto/update-user-membership.dto';

@Controller('user-memberships')
export class UserMembershipController {
  constructor(private readonly service: UserMembershipService) {}

  @Post()
  create(@Body() createDto: CreateUserMembershipDto) {
    return this.service.create(createDto);
  }

  @Get()
  findAll(@Query() filters: PaginationQueryDto) {
    return this.service.findAll(filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateUserMembershipDto) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
