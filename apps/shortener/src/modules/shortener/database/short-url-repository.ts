import { ShortenUrlResponse } from "../application/dto/shorten-url.dto";
import { ShortUrl } from "../entities/short-url";

export abstract class ShortUrlRepository{
	abstract create(shortUrl: ShortUrl):Promise<void>;
	abstract findByShortCode(shortCode: string): Promise<ShortenUrlResponse>;
}