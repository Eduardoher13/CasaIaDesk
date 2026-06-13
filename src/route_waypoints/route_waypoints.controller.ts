import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { RouteWaypointService } from './route_waypoints.service';
import { CreateRouteWaypointDto } from './dto/create-route-waypoint.dto';
import { UpdateRouteWaypointDto } from './dto/update-route-waypoint.dto';

@Controller('route-waypoints')
export class RouteWaypointController {
  constructor(private readonly service: RouteWaypointService) {}

  @Post()
  create(@Body() createDto: CreateRouteWaypointDto) {
    return this.service.create(createDto);
  }

  @Get()
  findAll(@Query('skip') skip = '0', @Query('take') take = '10') {
    return this.service.findAll(parseInt(skip), parseInt(take));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateRouteWaypointDto) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
