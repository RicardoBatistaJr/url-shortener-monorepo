import { Module } from '@nestjs/common';
import { ShortenUrlUseCase } from './application/use-case/shorten-url.use-case';
import { ShortUrlController } from './http/controllers/short-url-controller';
import { PrismaShortUrlRepository } from './database/prisma/prisma-short-url-repository';
import { DatabaseModule } from '../../../../../libs/database/src';
import { SHORT_URL_REPOSITORY_TOKEN } from './infrastructure/tokens/tokens';
import { UrlExistsUseCase } from './application/use-case/url-exists.use-case';
import { FindByShortCodeUseCase } from './application/use-case/find-by-short-code.use-case';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
import { DeleteByShortCodeUseCase } from './application/use-case/delete-by-short-code.use-case';
import { FindByUserUseCase } from './application/use-case/find-by-user.use-case';
import { UpdateOriginalUrlUseCase } from './application/use-case/update-url.use-case';

@Module({
  imports: [
	PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
	DatabaseModule],
  controllers: [ShortUrlController],
  providers: [
	JwtStrategy,
    ShortenUrlUseCase,
	UrlExistsUseCase,
	FindByShortCodeUseCase,
	FindByUserUseCase,
	DeleteByShortCodeUseCase,
	UpdateOriginalUrlUseCase,
  ],
})
export class ShortenerModule {}