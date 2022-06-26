import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { FoodModule } from './food/food.module';
import { MealModule } from './meal/meal.module';
import { HealthyDayController } from './healthy-day/healthy-day.controller';
import { HealthyDayModule } from './healthy-day/healthy-day.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      autoLoadEntities: true,
    }),
    AuthModule,
    FoodModule,
    MealModule,
    HealthyDayModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
