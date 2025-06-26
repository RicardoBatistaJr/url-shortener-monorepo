
import { Inject, Injectable } from "@nestjs/common";
import { randomBytes } from "crypto";
import { ShortUrl } from "../../entities/short-url";
import { ShortUrlRepository } from "../../database/short-url-repository";
import { SHORT_URL_REPOSITORY_TOKEN } from "../../infrastructure/tokens/tokens";
import { UrlExistsUseCase } from "./url-exists.use-case";
import { ShortenedLinkResponse, ShortenUrlRequest } from "../dto/shorten-url.dto";
import { JwtValidatedUser } from "../dto/jwt-validated-user.dto";

@Injectable()
export class ShortenUrlUseCase {
	constructor(
		@Inject(SHORT_URL_REPOSITORY_TOKEN)
		private readonly repository : ShortUrlRepository,
		private readonly urlExistsUseCase: UrlExistsUseCase,
	) {}

	async execute(request: ShortenUrlRequest, user?: JwtValidatedUser):Promise<ShortenedLinkResponse>{
		const maxRetries = 5;

		for(let attempt = 0; attempt <= maxRetries; attempt++){
			const generatedCode = this.generateCode();
			const urlExists = await this.urlExistsUseCase.execute(generatedCode);

			if(!urlExists){
				const shortUrl = ShortUrl.create(request.originalUrl, generatedCode);

				if(user){
					shortUrl.userId = user.id;
				}

				await this.repository.create(shortUrl);

				const shortenedLink = process.env.BASE_URL + generatedCode;
				
				return { shortenedLink };
			}

		}
		throw new Error('Falha ao gerar código único após o máximo de tentativas.');
	}

	private generateCode(): string{
		return randomBytes(4).toString('base64url').slice(0, 6);
	}
}