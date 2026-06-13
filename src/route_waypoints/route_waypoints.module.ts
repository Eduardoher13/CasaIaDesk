import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouteWaypoint } from './entities/route-waypoint.entity';
import { RouteWaypointService } from './route_waypoints.service';
import { RouteWaypointController } from './route_waypoints.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RouteWaypoint])],
  controllers: [RouteWaypointController],
  providers: [RouteWaypointService],
  exports: [RouteWaypointService],
})
export class RouteWaypointModule {}
