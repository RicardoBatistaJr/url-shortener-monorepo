import { ClickEvent } from "./click-event";
import { User } from "./user";

export class ShortUrl {
  private _shortCode: string;

  private constructor(
    shortCode: string,
    public originalUrl: string,
    public clickCount: number,
    public readonly id?: string,
    public userId?: string,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
    public deletedAt?: Date | null,
    public user?: User,
    public clickEvents?: ClickEvent[],
  ) {
    this.shortCode = shortCode;
  }

  static create(originalUrl: string, shortCode: string): ShortUrl {
    return new ShortUrl(shortCode, originalUrl, 0);
  }

  set shortCode(value: string) {
    if (!/^[a-zA-Z0-9_-]{4,}$/.test(value)) {
      throw new Error('Invalid short code format.');
    }
    this._shortCode = value;
  }

  get shortCode() {
    return this._shortCode;
  }
}
