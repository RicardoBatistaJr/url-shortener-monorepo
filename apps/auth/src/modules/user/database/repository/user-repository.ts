import { RegisterUserRequestDto } from "../../application/dto/create-user-request.dto";
import { LoginRequestDto } from "../../application/dto/login-request.dto";
import { UserResponse } from "../../application/dto/user-response.dto";

export abstract class UserRepository{
	abstract create(request: RegisterUserRequestDto): Promise<UserResponse>;
	abstract findByEmail(email:string): Promise<UserResponse>;
	abstract existsByEmail(email:string): Promise<boolean>;
}