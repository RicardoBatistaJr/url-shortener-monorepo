import { ShortUrl } from './short-url';

export class User {
  constructor(
    public readonly id: string,
    public email: string,
    public password: string,
    public urls: ShortUrl[],
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public deletedAt?: Date | null,
  ) {}
}

