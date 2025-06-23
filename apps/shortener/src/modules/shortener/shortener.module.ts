import { Module } from '@nestjs/common';
import { ShortenUrlUseCase } from './application/use-case/shorten-url.use-case';
import { ShortUrlController } from './http/controllers/short-url-controller';
import { PrismaShortUrlRepository } from './database/prisma/prisma-short-url-repository';
import { DatabaseModule } from '../../../../../libs/database/src';
import { SHORT_URL_REPOSITORY_TOKEN } from './infrastructure/tokens/tokens';
import { UrlExistsUseCase } from './application/use-case/url-exists.use-case';
import { FindByShortCodeUseCase } from './application/use-case/find-by-short-code.use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [ShortUrlController],
  providers: [
    ShortenUrlUseCase,
	UrlExistsUseCase,
	FindByShortCodeUseCase,
    PrismaShortUrlRepository,
	{
		provide: SHORT_URL_REPOSITORY_TOKEN,
		useClass: PrismaShortUrlRepository,
	}
  ],
})
export class ShortenerModule {}
