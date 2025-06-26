import { Role } from "generated/prisma";

export class UserTokenResponseDto {
	id: string;
	email: string;
	name: string;
	role: Role;
	access_token: string;
	refresh_token: string;
	token_type: string;
	expires_in: number;
}