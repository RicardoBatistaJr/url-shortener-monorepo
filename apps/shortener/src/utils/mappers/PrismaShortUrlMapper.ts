import { ShortUrl } from "../../modules/shortener/entities/short-url";
import { Prisma } from "generated/prisma";

export class PrismaShortUrlMapper {
  static toPrisma( {shortCode, originalUrl, clickCount, userId} : ShortUrl): Prisma.ShortUrlCreateInput {
    const data: Prisma.ShortUrlCreateInput = {
      shortCode,
      originalUrl,
      clickCount,
    };

    if (userId) {
      data.user = {
        connect: { id: userId }
      };
    }

    return data;
  }
}
