import { ShortenUrlResponse } from "../application/dto/shorten-url.dto";
import { ShortUrl } from "../entities/short-url";

export abstract class ShortUrlRepository{
	abstract create(shortUrl: ShortUrl):Promise<void>;
	abstract findByShortCode(shortCode: string): Promise<ShortenUrlResponse>;
	abstract findById(id: string): Promise<ShortenUrlResponse>;
	abstract findByUser(userId: string): Promise<ShortenUrlResponse[]>;
	abstract findByUserIdAndShortCode(userId: string, shortCode: string): Promise<ShortenUrlResponse>;
	abstract softDeleteByRecord(record: ShortenUrlResponse):Promise<void>;
	abstract updateOriginalUrl(id: string, updatedUrl: string):Promise<ShortenUrlResponse>
}