import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserRepository } from "../../../user/database/repository/user-repository";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { LoginRequestDto } from "../../../user/application/dto/login-request.dto";
import { UserTokenResponseDto } from "../../../user/application/dto/user-token-response.dto";

@Injectable()
export class LoginUseCase {
	constructor(
		private readonly repository: UserRepository,
		private readonly jwtService: JwtService,
	){}

	async execute(loginDto: LoginRequestDto): Promise<UserTokenResponseDto>{
		  const { email, password } = loginDto;
		
			const user = await this.repository.findByEmail(email);
		
			if (!user || !user.isActive) {
			  throw new UnauthorizedException('Credenciais inválidas');
			}
		
			const isPasswordValid = await bcrypt.compare(password, user.password);
			
			if (!isPasswordValid) {
			  throw new UnauthorizedException('Credenciais inválidas');
			}
		
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