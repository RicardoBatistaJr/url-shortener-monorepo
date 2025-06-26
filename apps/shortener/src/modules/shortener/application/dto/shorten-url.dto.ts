export interface ShortenUrlRequest {
	originalUrl: string
}
export interface ShortenUrlResponse {
	id: string,
	shortCode: string,
	originalUrl: string,
	clickCount: number,
};

export interface ShortenedLinkResponse {
	shortenedLink: string
};