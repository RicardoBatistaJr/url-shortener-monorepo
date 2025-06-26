import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ShortUrlRepository } from "../../database/short-url-repository";
import { SHORT_URL_REPOSITORY_TOKEN } from "../../infrastructure/tokens/tokens";
import { ShortenUrlResponse } from "../dto/shorten-url.dto";

@Injectable()
export class UpdateUrlUseCase{
	constructor(
		@Inject(SHORT_URL_REPOSITORY_TOKEN)
		private readonly repository: ShortUrlRepository){}

	async execute(urlId: string, data: Partial<ShortenUrlResponse>){
		const record = await this.repository.findById(urlId);

		if(!record){
			throw new NotFoundException("Não encontrado link com esses parametros.");
		}

		return await this.repository.updateUrl(urlId, data);
	}
}