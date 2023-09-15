import { Module } from '@nestjs/common';
import { StatusModule } from './modules/status/status.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ProductsModule } from './modules/products/products.module';

@Module({
  imports: [StatusModule, ScheduleModule.forRoot(), ProductsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
