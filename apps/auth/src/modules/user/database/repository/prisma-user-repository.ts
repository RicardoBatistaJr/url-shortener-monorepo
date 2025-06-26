import { NotFoundException } from "@nestjs/common";
import { RegisterUserRequestDto } from "../../application/dto/create-user-request.dto";
import { UserResponse } from "../../application/dto/user-response.dto";
import { UserRepository } from "./user-repository";
import { PrismaService } from "@app/database";

export class PrismaUserRepository implements UserRepository {
	constructor(private readonly prisma: PrismaService){}
	async create({email, password, name}: RegisterUserRequestDto): Promise<UserResponse> {
		return await this.prisma.user.create({
			data: {
				email,
				password,
				name,
			}
		});
	}

	async findByEmail(email: string): Promise<UserResponse> {
		return await this.prisma.user.findUnique({
			where: {email}
		})
	}

	async existsByEmail(email: string): Promise<boolean> {
		const count = await this.prisma.user.count({
			where: {email, deletedAt: null}
		});
		return count > 0;
	}
}