import { ShortUrl } from "../../entities/short-url";
import { PrismaShortUrlMapper } from "apps/shortener/src/utils/mappers/PrismaShortUrlMapper";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "@app/database/prisma.service";
import { ShortUrlRepository } from "../short-url-repository";
import { ShortenUrlResponse } from "../../application/dto/shorten-url.dto";

@Injectable()
export class PrismaShortUrlRepository implements ShortUrlRepository {
	constructor(
		private readonly prisma: PrismaService
	){}
	async create(shortUrl: ShortUrl): Promise<void> {
		const shortUrlRaw = PrismaShortUrlMapper.toPrisma(shortUrl);

		await this.prisma.shortUrl.create({
			data: shortUrlRaw
		})
	}

	async findByShortCode(shortCode: string): Promise<ShortenUrlResponse> {
		return await this.prisma.shortUrl.findUnique({
			where: { shortCode }
		});
	}
}