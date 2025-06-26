import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ShortUrlRepository } from "../../database/short-url-repository";
import { SHORT_URL_REPOSITORY_TOKEN } from "../../infrastructure/tokens/tokens";
import { JwtValidatedUser } from "../dto/jwt-validated-user.dto";

@Injectable()
export class DeleteByShortCodeUseCase {
	constructor(
		@Inject(SHORT_URL_REPOSITORY_TOKEN)
		private readonly repository:ShortUrlRepository,
	){}

	async execute(shortCode: string, user:JwtValidatedUser): Promise<void>{
		const record = await this.repository.findByUserIdAndShortCode(shortCode, user.id);

		if(!record){
			throw new NotFoundException("Não encontrado link com esses parametros.");
		}

		await this.repository.softDeleteByRecord(record);
	}
}