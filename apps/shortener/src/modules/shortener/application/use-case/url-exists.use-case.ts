import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ShortUrlRepository } from "../../database/short-url-repository";
import { SHORT_URL_REPOSITORY_TOKEN } from "../../infrastructure/tokens/tokens";

@Injectable()
export class UrlExistsUseCase {
	constructor(
		@Inject(SHORT_URL_REPOSITORY_TOKEN)
		private readonly repository: ShortUrlRepository
	) {}

	async execute(code: string): Promise<boolean>{
		return !!(await this.repository.findByShortCode(code));
	}
}