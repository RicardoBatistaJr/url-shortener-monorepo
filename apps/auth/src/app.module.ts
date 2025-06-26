import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from '../../../libs/database/src';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot({
      isGlobal: true,
    }),
	DatabaseModule,
	AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
