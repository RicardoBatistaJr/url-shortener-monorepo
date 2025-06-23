export interface ShortenUrlRequest {
	userId?: string,
	originalUrl: string
}
export interface ShortenUrlResponse {
	shortCode: string,
	originalUrl: string,
	clickCount: number,
};

export interface ShortenedLinkResponse {
	shortenedLink: string
};