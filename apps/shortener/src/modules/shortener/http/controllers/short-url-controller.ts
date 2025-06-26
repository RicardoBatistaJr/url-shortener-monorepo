import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { ShortenUrlUseCase } from "../../application/use-case/shorten-url.use-case";
import { ShortenedLinkResponse, ShortenUrlRequest, ShortenUrlResponse } from "../../application/dto/shorten-url.dto";
import { FindByShortCodeUseCase } from "../../application/use-case/find-by-short-code.use-case";
import { OptionalAuthGuard } from "../../infrastructure/optional-auth.guard";
import { Request, Response } from 'express';
import { JwtValidatedUser } from "../../application/dto/jwt-validated-user.dto";
import { FindByUserUseCase } from "../../application/use-case/find-by-user.use-case";
import { DeleteByShortCodeUseCase } from "../../application/use-case/delete-by-short-code.use-case";
import { AuthGuard } from "@nestjs/passport";
import { UpdateOriginalUrlUseCase } from "../../application/use-case/update-url.use-case";

@Controller()
export class ShortUrlController {
	constructor(
		private readonly shortenUrlUseCase: ShortenUrlUseCase,
		private readonly findByShortCodeUseCase: FindByShortCodeUseCase,
		private readonly findByUserUseCase: FindByUserUseCase,
		private readonly deleteByShortCodeUseCase: DeleteByShortCodeUseCase,
		private readonly updateOriginalUrlUseCase: UpdateOriginalUrlUseCase,
	){}

	@Post('/shorten')
	@UseGuards(OptionalAuthGuard)
	async shorten(@Body() request: ShortenUrlRequest, @Req() req: Request) : Promise<ShortenedLinkResponse> {
		const user = req.user as JwtValidatedUser | undefined;
		return await this.shortenUrlUseCase.execute(request, user);
	}

	@UseGuards(AuthGuard)
	@Get('/:code')
	async redirect(@Param('code') code: string, @Res() res: Response) {
  		const shortUrl = await this.findByShortCodeUseCase.execute(code);
  		return res.redirect(shortUrl.originalUrl);
	}

	@Get('/by-user/:userId')
	async findByUser(@Param('userId') userId: string) : Promise<ShortenUrlResponse[]> {
  		return await this.findByUserUseCase.execute(userId);
	}

	@UseGuards(AuthGuard)
	@Delete('/:code')
	async softDeleteByShortCode(@Param('code') code: string, @Req() req: Request): Promise<void> {
		const user = req.user as JwtValidatedUser | undefined;
		await this.deleteByShortCodeUseCase.execute(code, user);
	}
	
	@UseGuards(AuthGuard)
	@Put(':urlId')
	async updateOriginalUrl(@Param('urlId') urlId: string, @Body() originalUrl: string): Promise<ShortenUrlResponse> {
		return await this.updateOriginalUrlUseCase.execute(originalUrl, urlId);
	}

}