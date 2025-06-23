import { ShortUrl } from "../../modules/shortener/entities/short-url";
import { Prisma } from "generated/prisma";

export class PrismaShortUrlMapper {
  static toPrisma(shortUrl: ShortUrl): Prisma.ShortUrlCreateInput {
    const data: Prisma.ShortUrlCreateInput = {
      shortCode: shortUrl.shortCode,
      originalUrl: shortUrl.originalUrl,
      clickCount: shortUrl.clickCount,
    };

    if (shortUrl.userId) {
      data.user = {
        connect: { id: shortUrl.userId }
      };
    }

    return data;
  }
}
