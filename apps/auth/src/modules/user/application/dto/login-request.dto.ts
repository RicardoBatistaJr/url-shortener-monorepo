import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { Transform } from "class-transformer";

export class LoginRequestDto {
	@IsEmail()
	@IsNotEmpty()
	@Transform(({ value }) => value?.toLowerCase().trim())
	email:string;

	@IsString()
	@MinLength(8)
	@IsNotEmpty()
	password:string;
}