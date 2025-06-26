import { ConflictException, Injectable } from "@nestjs/common";
import { RegisterUserRequestDto } from "../../../user/application/dto/create-user-request.dto";
import { UserRepository } from "../../../user/database/repository/user-repository";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { UserTokenResponseDto } from "../../../user/application/dto/user-token-response.dto";

@Injectable()
export class RegisterUserUseCase {
	constructor(
		private readonly repository: UserRepository,
		private readonly jwtService: JwtService,
	){}

	async execute(register: RegisterUserRequestDto): Promise<UserTokenResponseDto>{
		const { email, password, name } = register;

		const existingUser = await this.repository.findByEmail(email);

		if (existingUser) {
		throw new ConflictException('Email já está em uso');
		}

		const hashedPassword = await bcrypt.hash(password, 12);

		const user = await this.repository.create({email, password: hashedPassword, name});

		const tokens = await this.generateTokens(user);

		return {
			id: user.id,
			email: user.email,
			name: user.name,
			role: user.role,
			...tokens,
		};

	}

	private async generateTokens(user: any) {
		const payload = { 
		email: user.email, 
		sub: user.id, 
		role: user.role 
		};

		const [accessToken, refreshToken] = await Promise.all([
		this.jwtService.signAsync(payload, {
			secret: process.env.JWT_SECRET,
			expiresIn: '15m',
		}),
		this.jwtService.signAsync(payload, {
			secret: process.env.JWT_REFRESH_SECRET,
			expiresIn: '7d',
		}),
		]);

		return {
		access_token: accessToken,
		refresh_token: refreshToken,
		token_type: 'Bearer',
		expires_in: 900,
		};
	}
}