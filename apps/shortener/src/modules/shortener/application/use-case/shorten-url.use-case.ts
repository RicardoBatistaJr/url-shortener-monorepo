
import { Inject, Injectable } from "@nestjs/common";
import { randomBytes } from "crypto";
import { ShortUrl } from "../../entities/short-url";
import { ShortUrlRepository } from "../../database/short-url-repository";
import { SHORT_URL_REPOSITORY_TOKEN } from "../../infrastructure/tokens/tokens";
import { UrlExistsUseCase } from "./url-exists.use-case";
import { ShortenedLinkResponse, ShortenUrlRequest } from "../dto/shorten-url.dto";

@Injectable()
export class ShortenUrlUseCase {
	constructor(
		@Inject(SHORT_URL_REPOSITORY_TOKEN)
		private readonly repository : ShortUrlRepository,
		private readonly urlExistsUseCase: UrlExistsUseCase,
	) {}

	async execute(request: ShortenUrlRequest):Promise<ShortenedLinkResponse>{

		const maxRetries = 5;

		for(let attempt = 0; attempt <= maxRetries; attempt++){
			const generatedCode = this.generateCode();
			const urlExists = await this.urlExistsUseCase.execute(generatedCode);

			if(!urlExists){
				const shortUrl = ShortUrl.create(request.originalUrl, generatedCode);

				if(request.userId){
					shortUrl.userId = request.userId;
				}

				await this.repository.create(shortUrl);

				const shortenedLink = "www.localhost.com/" + generatedCode;
				return { shortenedLink };
			}

            console.log(`Code ${generatedCode} already exists, retrying... (${attempt + 1}/${maxRetries})`);

		}
		throw new Error('Failed to generate unique short code after maximum retries');
	}

	private generateCode(): string{
		return randomBytes(4).toString('base64url').slice(0, 6);
	}
}