import { Inject, Injectable } from "@nestjs/common";
import { SHORT_URL_REPOSITORY_TOKEN } from "../../infrastructure/tokens/tokens";
import { ShortUrlRepository } from "../../database/short-url-repository";
import { ShortenUrlResponse } from "../dto/shorten-url.dto";

@Injectable()
export class FindByUserUseCase {
	constructor(
		@Inject(SHORT_URL_REPOSITORY_TOKEN)
		private readonly repository: ShortUrlRepository
	) {}

	async execute(userId: string): Promise<ShortenUrlResponse[]>{
		return await this.repository.findByUser(userId);
	}
}