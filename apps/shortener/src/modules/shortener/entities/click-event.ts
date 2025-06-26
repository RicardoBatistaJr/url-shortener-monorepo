import { ShortUrl } from './short-url';

export class ClickEvent {
  constructor(
    public readonly id: string,
    public shortUrlId: string,
    public userAgent: string,
    public ipAddress: string,
    public clickedAt: Date,
    public referer?: string,
  ) {}
}
