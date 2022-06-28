import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateHealthyDayDto } from './dto/create-healthy-day.dto';
import { HealthyDayService } from './healthy-day.service';

@Controller('healthy-day')
@UseGuards(AuthGuard())
export class HealthyDayController {
  constructor(private healthyDayService: HealthyDayService) {}

  @Post()
  create(
    @Body() createHealthyDayDto: CreateHealthyDayDto,
    @GetUser() user: User,
  ) {
    return this.healthyDayService.create(createHealthyDayDto, user);
  }

  @Get()
  getList(@GetUser() user: User) {
    return this.healthyDayService.getList(user);
  }

  @Get('/:date')
  getByDate(@Param('date') date: Date, @GetUser() user: User) {
    return this.healthyDayService.getByDate(date, user);
  }
}
