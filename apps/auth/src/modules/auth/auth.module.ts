import { DatabaseModule } from '@app/database';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './http/auth.controller';
import { AuthService } from './application/auth.service';
import { JwtStrategy } from './application/strategies/jwt.strategy';


@Module({
  imports: [
    DatabaseModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '15m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}