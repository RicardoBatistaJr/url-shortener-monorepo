import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../../libs/database/src';
import { ShortenerModule } from './modules/shortener/shortener.module';

@Module({
  imports: [DatabaseModule, ShortenerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
