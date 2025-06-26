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

	async findById(id: string): Promise<ShortenUrlResponse> {
		return await this.prisma.shortUrl.findUnique({
			where: { id, deletedAt: null }
		});
	}
	async findByShortCode(shortCode: string): Promise<ShortenUrlResponse> {
		return await this.prisma.shortUrl.findUnique({
			where: { shortCode, deletedAt: null }
		});
	}

	async findByUserIdAndShortCode(userId: string, shortCode: string): Promise<ShortenUrlResponse> {
				return await this.prisma.shortUrl.findFirst({
			where: { shortCode , userId, deletedAt: null }
		});
	}
	async findByUser(userId: string): Promise<ShortenUrlResponse[]> {
		return await this.prisma.shortUrl.findMany({
			where: { userId , deletedAt: null }
		});
	}

	async softDeleteByRecord(record: ShortenUrlResponse): Promise<void> {
		this.prisma.shortUrl.update({
			where: {
			id: record.id,
			},
			data: {
			deletedAt: new Date(),
			},
  		});
	}

	async updateOriginalUrl(id: string, updatedUrl: string):Promise<ShortenUrlResponse>{
		return await this.prisma.shortUrl.update({
			where: { id, deletedAt:null },
			data:{ originalUrl: updatedUrl}
		})
	}
}