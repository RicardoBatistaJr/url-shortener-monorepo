import { Body, Controller, Get, Param, Post, Res } from "@nestjs/common";
import { ShortenUrlUseCase } from "../../application/use-case/shorten-url.use-case";
import { ShortenedLinkResponse, ShortenUrlRequest } from "../../application/dto/shorten-url.dto";
import { FindByShortCodeUseCase } from "../../application/use-case/find-by-short-code.use-case";
import { Response } from 'express';

@Controller('shorten')
export class ShortUrlController {
	constructor(
		private readonly shortenUrlUseCase: ShortenUrlUseCase,
		private readonly findByShortCodeUseCase: FindByShortCodeUseCase,
	){}

	@Post()
	async shorten(@Body() request: ShortenUrlRequest) : Promise<ShortenedLinkResponse> {
		return await this.shortenUrlUseCase.execute(request);
	}

	@Get('/:code')
	async redirect(@Param('code') code: string, @Res() res: Response) {
  		const shortUrl = await this.findByShortCodeUseCase.execute(code);
  		return res.redirect(shortUrl.originalUrl);
	}
}