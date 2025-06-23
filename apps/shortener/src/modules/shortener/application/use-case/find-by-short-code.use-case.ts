import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ShortUrlRepository } from "../../database/short-url-repository";
import { SHORT_URL_REPOSITORY_TOKEN } from "../../infrastructure/tokens/tokens";
import { ShortenUrlResponse } from "../dto/shorten-url.dto";

@Injectable()
export class FindByShortCodeUseCase {
	constructor(
		@Inject(SHORT_URL_REPOSITORY_TOKEN)
		private readonly repository: ShortUrlRepository
	) {}

	async execute(code: string): Promise<ShortenUrlResponse>{
		const response = await this.repository.findByShortCode(code);

		if(!response){
			throw new NotFoundException("Url não encontrada")
		}
		return response;
	}
}